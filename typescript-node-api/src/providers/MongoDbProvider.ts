import { ServiceManager } from '../ServiceManager';
import { Service } from '../model/Service';
import { ServiceSchema } from '../model/ServiceSchema';
import { ProcessInfo } from '../model/ProcessInfo';
import * as mongoose from "mongoose";
import { resolve } from 'url';
const debug = require('debug')('mondbprovider')

const ServiceDbSchema = mongoose.model('services', ServiceSchema);


export class MongoDbProvider implements ServiceManager {
    public async getServices(): Promise<Service[]> {
        return new Promise<Service[]>((resolve, reject) => {
            ServiceDbSchema.find({}, (err, services) => {
                if (err) {
                    reject(err);
                } else {
                    debug('getServices: services:' + JSON.stringify(services))  ;
                    resolve(services);
                }
            })
        });
    }

    public async getService(name: string): Promise<Service> {
        return new Promise<Service>((resolve, reject) => {
            ServiceDbSchema.find({ name: name}, (err, service) => {
                if (err) {
                    reject(err);
                } else {
                    debug('getServices: services:' + JSON.stringify(service))  ;
                    resolve(service);
                }
            })
        });
    }

    public getResponse(name: string, request: string): ProcessInfo {
        return undefined;
    }
}