"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDbProvider_1 = require("./MongoDbProvider");
var ServiceManagerFactory;
(function (ServiceManagerFactory) {
    function createServiceManager() {
        //return new InMemoryProvider();
        //return new ServicesFileProvider();
        return new MongoDbProvider_1.MongoDbProvider();
    }
    ServiceManagerFactory.createServiceManager = createServiceManager;
})(ServiceManagerFactory = exports.ServiceManagerFactory || (exports.ServiceManagerFactory = {}));
