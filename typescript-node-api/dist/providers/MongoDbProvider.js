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
const ResponseSchema_1 = require("../model/ResponseSchema");
const LogRequestSchema_1 = require("../model/LogRequestSchema");
const ProcessInfo_1 = require("../model/ProcessInfo");
const mongoose = require("mongoose");
const ProcessedRequest_1 = require("../model/ProcessedRequest");
const debug = require('debug')('mongodbprovider');
const ServiceDbSchema = mongoose.model('services', ServiceSchema_1.ServiceSchema);
const ResponseDbSchema = mongoose.model('responses', ResponseSchema_1.ResponseSchema);
const LogRequestDbSchema = mongoose.model('logs', LogRequestSchema_1.LogRequestSchema);
class MongoDbProvider {
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter getServices');
            return yield ServiceDbSchema.find({});
        });
    }
    getService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter getService');
            const cursor = yield ServiceDbSchema.find({ name: name });
            if (cursor.length > 0) {
                return cursor[0];
            }
            debug('service ' + name + ' found');
            return undefined;
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
                ResponseDbSchema.find({
                    name: responseNameKey
                }, (err, response) => {
                    if (err) {
                        debug('warn:' + err);
                        reject(err);
                    }
                    else {
                        if (response.length == 0) {
                            resolve(undefined);
                            return;
                        }
                        var processInfo = new ProcessInfo_1.ProcessInfo(request);
                        processInfo.matches = foundConfig.matches;
                        processInfo.response = response[0].response;
                        resolve(processInfo);
                    }
                });
            });
        });
    }
    logRequest(name, date, status, processInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter logRequest');
            var matches = '';
            if (processInfo.matches !== undefined) {
                matches = processInfo.matches.join(',');
            }
            yield LogRequestDbSchema.collection.insertOne({
                name: name,
                date: date,
                status: status,
                request: processInfo.request,
                response: processInfo.response,
                matches: matches
            });
            return true;
        });
    }
    getProcessedRequests(name) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('enter getProcessedRequests:' + name);
            var results = [];
            var response = yield LogRequestDbSchema.collection.find({
                name: name
            }).toArray();
            response.forEach(r => {
                results.push(new ProcessedRequest_1.ProcessedRequest(r.date, r.status, r.request, r.response, r.matches));
            });
            return results;
        });
    }
    clearProcessedRequests(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield LogRequestDbSchema.collection.remove({
                name: name
            });
            return true;
        });
    }
}
exports.MongoDbProvider = MongoDbProvider;
