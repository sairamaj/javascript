"use strict";
exports.__esModule = true;
var crmModel_1 = require("./models/crmModel");
var mongoose = require("mongoose");
var mongoUrl = 'mongodb://localhost/CRMdb';
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl);
var Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
var newContact = new Contact();
newContact.firstName = 'sourabh';
newContact.lastName = "jamal";
newContact.email = 'sj@abc.com';
console.log('writing contrct.');
newContact.save(function (err, contact) {
    if (err) {
        console.log(err);
    }
    console.log(contact);
});
