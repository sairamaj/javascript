"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InMemoryProvider_1 = require("./InMemoryProvider");
var ServiceManagerFactory;
(function (ServiceManagerFactory) {
    function createServiceManager() {
        return new InMemoryProvider_1.InMemoryProvider();
        //return new ServicesFileProvider();
        //return new MongoDbProvider();
    }
    ServiceManagerFactory.createServiceManager = createServiceManager;
})(ServiceManagerFactory = exports.ServiceManagerFactory || (exports.ServiceManagerFactory = {}));
