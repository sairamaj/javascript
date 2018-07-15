"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
var debug = require('debug')('servicefileprovider');
class ServiceFileProvider {
    constructor(name) {
        this.name = name;
        this.configMaps = [];
        var mapFileName = this.getConfigMapFile();
        if (!fs.existsSync(mapFileName)) {
            debug('warn: map file name does not exists:' + mapFileName);
            return;
        }
        this.configMaps = JSON.parse(fs.readFileSync(mapFileName, 'utf-8'));
    }
    getResponse(request) {
        debug('enter:getResponse');
        debug('getResponse: finding map.');
        var foundConfig = this.configMaps.find(c => {
            if (c.matches === undefined) {
                return false;
            }
            var match = c.matches.find(m => request.includes(m)) !== undefined;
            return match;
        });
        debug('getResponse:foundConfig:' + foundConfig);
        if (foundConfig === undefined) {
            debug('warn:getResponse map not found');
            return null;
        }
        var responseFileName = this.getResponseFileName(foundConfig.name);
        if (!fs.existsSync(responseFileName)) {
            debug('warn: response fileName not found:' + responseFileName);
            return null;
        }
        debug('getResponse: reading file:' + responseFileName);
        return fs.readFileSync(responseFileName, 'utf-8');
    }
    getConfigMap() {
        return null;
    }
    getDataDirectory() {
        return process.cwd() + path.sep + 'data';
    }
    getServiceDirectory() {
        return process.cwd() + path.sep + 'data' + path.sep + this.name;
    }
    getServiceResponseDirectory() {
        return this.getDataDirectory() + path.sep + this.name + path.sep + 'responses';
    }
    getResponseFileName(requestName) {
        return this.getServiceResponseDirectory() + path.sep + requestName + '.xml';
    }
    getConfigMapDirectory(serviceName) {
        return this.getServiceDirectory() + path.sep + 'config';
    }
    getConfigMapFile() {
        return this.getConfigMapDirectory(this.name) + path.sep + 'map.json';
    }
}
exports.ServiceFileProvider = ServiceFileProvider;
