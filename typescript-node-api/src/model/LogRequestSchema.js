"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.LogRequestSchema = new Schema({
    name: {
        type: String,
        required: 'Name required'
    },

    date: {
        type: Date,
        required: 'Date required'
    },

    status: {
        type: String,
        required: 'status required'
    },

    request: {
        type: String,
    },

    response: {
        type: String,
    },

    matches: {
        type: String,
    }
});
