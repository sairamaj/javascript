"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessInfo_1 = require("../model/ProcessInfo");
const TestData = require('../testdata/testdata1');
class InMemoryProvider {
    getHosts() {
        return TestData;
    }
    getHost(name) {
        return TestData.find(h => h.name == name);
    }
    getResponse(name, request) {
        var host = this.getHost(name);
        if (host === undefined) {
            return undefined;
        }
        var foundConfig = host.config.find(c => {
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
