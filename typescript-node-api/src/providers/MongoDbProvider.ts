import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ServiceSchema } from '../model/ServiceSchema';
import { ProcessInfo } from '../model/ProcessInfo';
import * as mongoose from "mongoose";
import { resolve } from 'url';
const debug = require('debug')('mongodbprovider')

const ServiceDbSchema = mongoose.model('services', ServiceSchema);


export class MongoDbProvider implements ServiceManager {
    public async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve, reject) => {
            ServiceDbSchema.find({}, (err, services) => {
                if (err) {
                    reject(err);
                } else {
                    debug('getServices: services:' + JSON.stringify(services));
                    resolve(services);
                }
            })
        });
    }

    public async getService(name: string): Promise<Service> {
        return new Promise<Service>((resolve, reject) => {
            ServiceDbSchema.find({ name: name }, (err, service) => {
                if (err) {
                    reject(err);
                } else {
                    debug('getServices: services:' + JSON.stringify(service));
                    resolve(service);
                }
            })
        });
    }

    public async getResponse(name: string, request: string): Promise<ProcessInfo> {
        debug('enter getResponse: ' + name)
        var service = await this.getService(name);
        
        if (service === undefined) {
            debug('warn: ' + name + ' not found.');
            return undefined;
        }else if(service.config === undefined){
            debug('warn: ' + name + ' config not found.');
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

        var responseNameKey = name + "_response_" + foundConfig.name;
        debug('reading mongodb:' + responseNameKey);
        return new Promise<ProcessInfo>((resolve, reject) => {
            ServiceDbSchema.find({ key: responseNameKey
             }, (err, response) => {
                if (err) {
                    debug('warn:' + err);
                    reject(err);
                } else {
                    resolve(response);
                }
            })
        });
    }
}