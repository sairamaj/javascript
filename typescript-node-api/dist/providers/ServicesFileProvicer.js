"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return new Promise((resolve, reject) => {
            glob(this.getDataDirectory() + '/*', (err, dirs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(dirs.map(d => new Service_1.Service(d.split('/').slice(-1)[0], [])));
                }
            });
        });
    }
    getService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter:getService');
            var services = yield this.getServices();
            return services.find(s => s.name == name);
        });
    }
    getResponse(name, request) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter:getResponse');
            var serviceProvider = new ServiceFileProvider_1.ServiceFileProvider(name);
            var response = serviceProvider.getResponse(request);
            if (response === undefined) {
                return null;
            }
            var processInfo = new ProcessInfo_1.ProcessInfo(request);
            processInfo.response = yield serviceProvider.getResponse(request);
            return processInfo;
        });
    }
    getDataDirectory() {
        return process.cwd() + path.sep + 'data';
    }
}
exports.ServicesFileProvider = ServicesFileProvider;
