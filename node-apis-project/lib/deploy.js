"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var ServiceModel_1 = require("./models/ServiceModel");
var mongoUrl = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
var Service = mongoose.model('services', ServiceModel_1.ServiceSchema);
var newService = new Service();
newService.name = "service1";
newService.config = [];
newService.config.push({
    name: "request_1",
    matches: ["request_1", "input1"]
});
console.log('writing contrct.');
newService.save(function (err, service) {
    if (err) {
        console.log(err);
    }
    console.log(service);
    mongoose.disconnect();
});
