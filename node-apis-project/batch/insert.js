"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var ServiceModel_1 = require("../lib/models/ServiceModel");
var fs = require("fs");
var mongoUrl = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
var Service = mongoose.model('services', ServiceModel_1.ServiceSchema);
var newService = new Service();
var data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
Service.collection.insertMany(data, function (err, result) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('success:' + result.insertedCount);
    }
    mongoose.disconnect();
});
