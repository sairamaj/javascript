"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../model/Service");
const ProcessInfo_1 = require("../model/ProcessInfo");
const glob = require("glob");
const path = require("path");
const ServiceFileProvider_1 = require("./ServiceFileProvider");
var debug = require('debug')('servicesfileprovider');
class ServicesFileProvider {
    getServices() {
        debug('enter:getServices');
        var services = [];
        debug('reading :' + this.getDataDirectory() + '/*');
        glob.sync(this.getDataDirectory() + '/*').forEach(dir => {
            var name = dir.split('/').slice(-1)[0];
            services.push(new Service_1.Service(name, []));
        });
        debug('returning services:' + services.join());
        return services;
    }
    getService(name) {
        debug('enter:getService');
        return this.getServices().find(s => s.name == name);
    }
    getResponse(name, request) {
        debug('enter:getResponse');
        var serviceProvider = new ServiceFileProvider_1.ServiceFileProvider(name);
        var response = serviceProvider.getResponse(request);
        if (response === undefined) {
            return null;
        }
        var processInfo = new ProcessInfo_1.ProcessInfo(request);
        processInfo.response = response;
        return processInfo;
    }
    getDataDirectory() {
        return process.cwd() + path.sep + 'data';
    }
}
exports.ServicesFileProvider = ServicesFileProvider;
