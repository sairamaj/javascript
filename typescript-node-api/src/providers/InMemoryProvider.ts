import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ProcessInfo } from '../model/ProcessInfo';
import { resolve } from 'path';
const TestData = require('../../testdata/testdata1')
const debug = require('debug')('servicefileprovider')

export class InMemoryProvider implements ServiceManager {
    public async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve)=>{
            resolve(TestData);
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
}