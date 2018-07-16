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

        this.configMaps = JSON.parse(fs.readFileSync(mapFileName,'utf-8'));
    }

    public getResponse(request: string): string {
        debug('enter:getResponse');

        debug('getResponse: finding map.')
        var foundConfig = this.configMaps.find(c => {
            if (c.matches === undefined) {
                return false;
            }
            var match = c.matches.find(m => request.includes(m)) !== undefined;
            return match;
        })

        debug('getResponse:foundConfig:' + foundConfig);
        if (foundConfig === undefined) {
            debug('warn:getResponse map not found');
            return undefined;
        }

        var responseFileName = this.getResponseFileName(foundConfig.name);
        if (!fs.existsSync(responseFileName)) {
            debug('warn: response fileName not found:' + responseFileName);
            return undefined;
        }

        debug('getResponse: reading file:' + responseFileName);
        return fs.readFileSync(responseFileName, 'utf-8')
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