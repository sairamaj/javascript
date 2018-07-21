import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';56

import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { ServiceFileProvider } from './ServiceFileProvider';
import { ProcessedRequest } from '../model/ProcessedRequest';
import { ProcessLogFileManager } from './ProcessedLogFileManager';
import { MapDetail } from '../model/MapDetail';
var debug = require('debug')('servicesfileprovider')

export class ServicesFileProvider implements ServiceManager {
    public getServices(): Promise<Service[]> {
        debug('enter:getServices')
        var services = []
        debug('reading :' + this.getDataDirectory() + '/*')

        return new Promise<Service[]>((resolve, reject) => {
            glob(this.getDataDirectory() + '/*', (err, dirs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(dirs.map(d => new Service(d.split('/').slice(-1)[0], [])));
                }
            });
        });
    }

    public async getService(name: string): Promise<Service> {
        debug('enter:getService');
        var services = await this.getServices();
        return services.find(s => s.name == name);
    }

    public async getMapDetail(name: string, mapName: string) : Promise<MapDetail>{
        return null;
    }
    
    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        debug('enter:getResponse');

        var serviceProvider = new ServiceFileProvider(name);
        var processInfo = await serviceProvider.getResponse(request);
        if (processInfo === undefined) {
            return null;
        }

        return processInfo;
    }

    getDataDirectory(): string {
        return process.cwd() + path.sep + 'data';
    }

    public async logRequest(name: string, date: Date, status: number, processInfo: ProcessInfo): Promise<boolean> {
        await new ProcessLogFileManager(name).writeLog(new ProcessedRequest(date,status,processInfo.request,processInfo.response, processInfo.matches));
        return true;
    }

    public async getProcessedRequests(name: string): Promise<ProcessedRequest[]> {
        return await new ProcessLogFileManager(name).getLogs();
    }

    public async clearProcessedRequests(name: string): Promise<boolean> {
        await new ProcessLogFileManager(name).clearLogs();
        return true;
    }
}