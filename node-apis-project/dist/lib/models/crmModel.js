"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//   /lib/models/crmModel.ts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
