"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessInfo_1 = require("../model/ProcessInfo");
const TestData = require('../testdata/testdata1');
class InMemoryProvider {
    getServices() {
        return TestData;
    }
    getService(name) {
        return TestData.find(h => h.name == name);
    }
    getResponse(name, request) {
        var service = this.getService(name);
        if (service === undefined || service.config === undefined) {
            return undefined;
        }
        var foundConfig = service.config.find(c => {
            if (c.matches === undefined) {
                return false;
            }
            var match = c.matches.find(m => request.includes(m)) !== undefined;
            console.log('match :' + match);
            return match;
        });
        console.log('foundConfig:' + foundConfig);
        if (foundConfig === undefined) {
            return undefined;
        }
        var processInfo = new ProcessInfo_1.ProcessInfo(request);
        processInfo.matches = [];
        processInfo.response = foundConfig.response;
        return processInfo;
    }
}
exports.InMemoryProvider = InMemoryProvider;
