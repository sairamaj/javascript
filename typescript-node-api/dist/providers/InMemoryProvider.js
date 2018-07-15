"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestData = require('../testdata/testdata1');
class InMemoryProvider {
    getHosts() {
        return TestData;
    }
    getHost(name) {
        return TestData.find(h => h.name == name);
    }
}
exports.InMemoryProvider = InMemoryProvider;
