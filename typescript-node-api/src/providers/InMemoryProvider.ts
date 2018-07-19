import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import { resolve } from 'path';
import { ProcessedRequest } from '../model/ProcessedRequest';
const debug = require('debug')('inmemoryprovider')

class LoggerIntance {
    private static instance: LoggerIntance;
    private Logs: ProcessedRequest[] = []
    static getInstance() {
        if (!LoggerIntance.instance) {
            LoggerIntance.instance = new LoggerIntance();
            // ... any one time initialization goes here ...
        }
        return LoggerIntance.instance;
    }

    public getLogs(): ProcessedRequest[] {
        return this.Logs;
    }

    public clear() {
        this.Logs = []
    }

    public add(log: ProcessedRequest){
        this.Logs.push(log);
    }
}

export class InMemoryProvider implements ServiceManager {
    TestData: any;
    constructor() {
        this.TestData = require('../../testdata/testdata1');
    }

    public async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve) => {
            resolve(this.TestData);
        });
    }

    public async getService(name: string): Promise<Service> {
        var services = await this.getServices();
        return services.find(h => h.name == name)
    }

    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        var service = await this.getService(name);
        if (service === undefined || service.config === undefined) {
            debug('warn: ' + name + ' not found.');
            return undefined;
        }

        var foundConfig = service.config.find(c => {
            if (c.matches === undefined) {
                return false;
            }

            return c.matches.every(m => request.includes(m));
        });

        if (foundConfig === undefined) {
            debug('warn: matching not found.');
            return undefined;
        }
        debug('foundConfig:' + JSON.stringify(foundConfig));

        var processInfo = new ProcessInfo(request);
        processInfo.matches = [];
        processInfo.response = foundConfig.response;
        return processInfo;
    }

    public async logRequest(date: Date, status: number, processInfo: ProcessInfo): Promise<boolean> {
        debug('logRequest.enter')
        return new Promise<boolean>((resolve) => {
            LoggerIntance.getInstance().add(new ProcessedRequest(date, status, processInfo.request, processInfo.response, processInfo.matches))
            resolve(true);
        });
    }

    public async getProcessedRequests(): Promise<ProcessedRequest[]> {
        debug('getProcessedRequests.enter')
        return new Promise<ProcessedRequest[]>((resolve) => {
            resolve(LoggerIntance.getInstance().getLogs());
        });
    }

    public async clearProcessedRequests(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            LoggerIntance.getInstance().clear();
            resolve(true);
        });
    }
}