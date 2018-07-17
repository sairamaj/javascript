"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var ServiceModel_1 = require("../lib/models/ServiceModel");
var mongoUrl = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
var Service = mongoose.model('services', ServiceModel_1.ServiceSchema);
Service.find({}, function (err, services) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(typeof services);
        console.log(JSON.stringify(services), null, 4);
    }
    mongoose.disconnect();
});
