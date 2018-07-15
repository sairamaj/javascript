import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { ServiceFileProvider } from './ServiceFileProvider';
var debug = require('debug')('servicesfileprovider')

export class ServicesFileProvider implements ServiceManager {
    public getServices(): Service[] {
        debug('enter:getServices')
        var services = []
        debug('reading :' + this.getDataDirectory() + '/*')

        glob.sync(this.getDataDirectory() + '/*').forEach(dir => {
            var name = dir.split('/').slice(-1)[0]
            services.push(new Service(name, []))
        });

        debug('returning services:' + services.join())
        return services;
    }

    public getService(name: string): Service {
        debug('enter:getService')
        return this.getServices().find(s => s.name == name);
    }

    public getResponse(name: string, request: string): ProcessInfo {
        debug('enter:getResponse');
        
        var serviceProvider = new ServiceFileProvider(name);
        var response = serviceProvider.getResponse(request);
        if( response === undefined){
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