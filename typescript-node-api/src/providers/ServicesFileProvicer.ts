import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { ServiceFileProvider } from './ServiceFileProvider';
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

    public getService(name: string): Service {
        debug('enter:getService')
        //return this.getServices().find(s => s.name == name);
    return undefined;   
    }

    public getResponse(name: string, request: string): ProcessInfo {
        debug('enter:getResponse');

        var serviceProvider = new ServiceFileProvider(name);
        var response = serviceProvider.getResponse(request);
        if (response === undefined) {
            return null;
        }

        var processInfo = new ProcessInfo(request);
        processInfo.response = response;
        return processInfo;
    }

    getDataDirectory(): string {
        return process.cwd() + path.sep + 'data';
    }


}