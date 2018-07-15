"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Host_1 = require("./model/Host");
class HostManager {
    getHosts() {
        return [
            new Host_1.Host('datasafe'),
            new Host_1.Host('xp2'),
            new Host_1.Host('cbsconsumer'),
            new Host_1.Host('spectrum'),
            new Host_1.Host('dna'),
            new Host_1.Host('fis'),
        ];
    }
    getHost(name) {
        return this.getHosts().find(h => h.name == name);
    }
}
exports.HostManager = HostManager;
