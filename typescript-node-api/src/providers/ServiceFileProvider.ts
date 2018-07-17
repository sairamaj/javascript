import { ServiceConfigMap } from "../model/ServiceConfigMap";
import * as path from 'path';
import * as fs from 'fs';
import { Service } from "../model/Service";
var debug = require('debug')('servicefileprovider')

export class ServiceFileProvider {
    configMaps: ServiceConfigMap[];
    constructor(public name: string) {
        this.configMaps = [];
        var mapFileName = this.getConfigMapFile();
        if (!fs.existsSync(mapFileName)) {
            debug('warn: map file name does not exists:' + mapFileName);
            return;
        }

        this.configMaps = JSON.parse(fs.readFileSync(mapFileName, 'utf-8'));
    }

    public async getResponse(request: string): Promise<string> {
        debug('enter:getResponse');

        debug('getResponse: finding map.')
        var foundConfig = this.configMaps.find(c => {
            if (c.matches === undefined) {
                return false;
            }
            return c.matches.every(m => request.includes(m));
        })

        debug('getResponse:foundConfig:' + foundConfig);
        if (foundConfig === undefined) {
            debug('warn:getResponse map not found');
            return undefined;
        }

        var responseFileName = this.getResponseFileName(foundConfig.name);

        return new Promise<string>((resolve, reject) => {
            debug('getResponse: reading file:' + responseFileName);
            if (!fs.existsSync(responseFileName)) {
                resolve(undefined);
                return;
            }

            return fs.readFile(responseFileName, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public getConfigMap(): ServiceConfigMap {
        return null;
    }


    getDataDirectory(): string {
        return process.cwd() + path.sep + 'data';
    }

    getServiceDirectory(): string {
        return process.cwd() + path.sep + 'data' + path.sep + this.name;
    }

    getServiceResponseDirectory(): string {
        return this.getDataDirectory() + path.sep + this.name + path.sep + 'responses';
    }


    getResponseFileName(requestName: string): string {
        return this.getServiceResponseDirectory() + path.sep + requestName + '.xml';
    }

    getConfigMapDirectory(serviceName: string): string {
        return this.getServiceDirectory() + path.sep + 'config';
    }

    getConfigMapFile(): string {
        return this.getConfigMapDirectory(this.name) + path.sep + 'map.json';
    }
}