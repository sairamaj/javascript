import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
var debug = require('debug')('fileprovider')

export class FileProvider implements ServiceManager {
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
        var responseDirectory = this.getServiceResponseDirectory(name);
        debug('getResponse: response Directory: ' + responseDirectory)
        if (!fs.existsSync(responseDirectory)) {
            debug('warn: directory does not exist.' + responseDirectory);
            return null;
        }

        var responseFileName = this.getResponseFileName(name, 'request_1')
        if (!fs.existsSync(responseFileName)) {
            debug('warn: file does not exist.' + responseFileName);
            return null;
        }

        var responseData = fs.readFileSync(responseFileName, 'utf-8');
        
        var processInfo = new ProcessInfo(request);
        processInfo.response = responseData;
        return processInfo;
    }

    getDataDirectory(): string {
        return process.cwd() + path.sep + 'data';
    }

    getServiceResponseDirectory(serviceName: string): string {
        return this.getDataDirectory() + path.sep + serviceName + path.sep + 'responses';
    }

    getResponseFileName(serviceName: string, requestName: string): string {
        return this.getServiceResponseDirectory(serviceName) + path.sep + requestName + '.xml';
    }
}