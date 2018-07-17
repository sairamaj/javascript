import * as mongoose from "mongoose";
import { ServiceSchema } from '../lib/models/ServiceModel';
import * as fs from "fs";

var mongoUrl: string = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

const Service = mongoose.model('services', ServiceSchema);
Service.find({}, (err, services) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JSON.stringify(services), null, 4);
    }   

    mongoose.disconnect();
});