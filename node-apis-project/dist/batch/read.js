"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ServiceModel_1 = require("../lib/models/ServiceModel");
var mongoUrl = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
const Service = mongoose.model('services', ServiceModel_1.ServiceSchema);
Service.find({}, (err, services) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(JSON.stringify(services), null, 4);
    }
    mongoose.disconnect();
});
