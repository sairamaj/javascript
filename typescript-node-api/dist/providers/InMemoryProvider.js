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
const ProcessInfo_1 = require("../model/ProcessInfo");
const TestData = require('../../testdata/testdata1');
const debug = require('debug')('servicefileprovider');
class InMemoryProvider {
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                resolve(TestData);
            });
        });
    }
    getService(name) {
        return __awaiter(this, void 0, void 0, function* () {
            var services = yield this.getServices();
            return services.find(h => h.name == name);
        });
    }
    getResponse(name, request) {
        return __awaiter(this, void 0, void 0, function* () {
            var service = yield this.getService(name);
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
            var processInfo = new ProcessInfo_1.ProcessInfo(request);
            processInfo.matches = [];
            processInfo.response = foundConfig.response;
            return processInfo;
        });
    }
}
exports.InMemoryProvider = InMemoryProvider;
