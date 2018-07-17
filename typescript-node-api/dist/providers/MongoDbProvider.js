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
const ServiceSchema_1 = require("../model/ServiceSchema");
const mongoose = require("mongoose");
const debug = require('debug')('mongodbprovider');
const ServiceDbSchema = mongoose.model('services', ServiceSchema_1.ServiceSchema);
class MongoDbProvider {
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                ServiceDbSchema.find({}, (err, services) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        debug('getServices: services:' + JSON.stringify(services));
                        resolve(services);
                    }
                });
            });
        });
    }
    getService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                ServiceDbSchema.find({ name: name }, (err, service) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        debug('getServices: services:' + JSON.stringify(service));
                        resolve(service);
                    }
                });
            });
        });
    }
    getResponse(name, request) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter getResponse: ' + name);
            var service = yield this.getService(name);
            if (service === undefined) {
                debug('warn: ' + name + ' not found.');
                return undefined;
            }
            else if (service.config === undefined) {
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
            return new Promise((resolve, reject) => {
                ServiceDbSchema.find({ key: responseNameKey
                }, (err, response) => {
                    if (err) {
                        debug('warn:' + err);
                        reject(err);
                    }
                    else {
                        resolve(response);
                    }
                });
            });
        });
    }
}
exports.MongoDbProvider = MongoDbProvider;
