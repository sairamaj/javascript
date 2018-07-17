import * as mongoose from "mongoose";
import { ServiceSchema } from './models/ServiceModel';

var mongoUrl: string = 'mongodb://localhost/simulator';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);

const Service = mongoose.model('services', ServiceSchema);
let newService = new Service();
newService.name = "service1";
newService.config = []
newService.config.push({
    name: "request_1",
    matches: ["request_1", "input1"]
});

console.log('writing contrct.')
newService.save((err, service) => {
    if (err) {
        console.log(err)
    }
    console.log(service);
    mongoose.disconnect();
});

