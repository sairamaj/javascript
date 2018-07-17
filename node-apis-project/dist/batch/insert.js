"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ServiceModel_1 = require("../lib/models/ServiceModel");
const fs = require("fs");
var mongoUrl = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
const Service = mongoose.model('services', ServiceModel_1.ServiceSchema);
let newService = new Service();
let data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
Service.collection.insertMany(data, (err, result) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('success:' + result.insertedCount);
    }
    mongoose.disconnect();
});
