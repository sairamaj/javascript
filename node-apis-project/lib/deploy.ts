import { ContactSchema } from './models/crmModel';
import * as mongoose from "mongoose";

var mongoUrl: string = 'mongodb://localhost/CRMdb'; 
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);    

const Contact = mongoose.model('Contact', ContactSchema);
let newContact = new Contact();
newContact.firstName = 'sourabh'
newContact.lastName = "jamal";
newContact.email = 'sj@abc.com';

console.log('writing contrct.')
newContact.save((err, contact) => {
    if (err) {
        console.log(err)
    }
    console.log(contact);
});

