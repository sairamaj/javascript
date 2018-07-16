"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmModel_1 = require("models/crmModel");
const mongoose = require("mongoose");
var mongoUrl = 'mongodb://localhost/CRMdb';
mongoose.Promise = global.Promise;
mongoose.connect(this.mongoUrl);
const Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
let newContact = new Contact();
newContact.firstName = 'sourabh';
newContact.lastName = "jamal";
newContact.email = 'sj@abc.com';
console.log('writing contrct.');
newContact.save((err, contact) => {
    if (err) {
        console.log(err);
    }
    console.log(contact);
});
//# sourceMappingURL=deploy.js.map