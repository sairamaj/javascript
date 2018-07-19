import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { ServiceFileProvider } from './ServiceFileProvider';
import { ProcessedRequest } from '../model/ProcessedRequest';
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

    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        debug('enter:getResponse');

        var serviceProvider = new ServiceFileProvider(name);
        var response = serviceProvider.getResponse(request);
        if (response === undefined) {
            return null;
        }

        var processInfo = new ProcessInfo(request);
        processInfo.response = await serviceProvider.getResponse(request);
        return processInfo;
    }

    getDataDirectory(): string {
        return process.cwd() + path.sep + 'data';
    }

    public async logRequest(date: Date, status: number, processInfo: ProcessInfo): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }

    public async getProcessedRequests(): Promise<ProcessedRequest[]> {
        return new Promise<ProcessedRequest[]>((resolve) => {
            resolve([]);
        });
    }

    public async clearProcessedRequests(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });

    }
}