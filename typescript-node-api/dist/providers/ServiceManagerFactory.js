"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServicesFileProvicer_1 = require("./ServicesFileProvicer");
var ServiceManagerFactory;
(function (ServiceManagerFactory) {
    function createServiceManager() {
        return new ServicesFileProvicer_1.ServicesFileProvider();
    }
    ServiceManagerFactory.createServiceManager = createServiceManager;
})(ServiceManagerFactory = exports.ServiceManagerFactory || (exports.ServiceManagerFactory = {}));
