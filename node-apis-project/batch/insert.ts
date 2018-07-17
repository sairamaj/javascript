import * as mongoose from "mongoose";
import { ServiceSchema } from '../lib/models/ServiceModel';
import * as fs from "fs";

var mongoUrl: string = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

const Service = mongoose.model('services', ServiceSchema);
let newService = new Service();
let data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
Service.collection.insertMany(data, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log('success:' + result.insertedCount);
    }
    mongoose.disconnect();
});
