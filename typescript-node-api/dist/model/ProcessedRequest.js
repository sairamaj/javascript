"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessedRequest {
    constructor(date, request, response, matches) {
        this.date = date;
        this.request = request;
        this.response = response;
        this.matches = matches;
    }
}
exports.ProcessedRequest = ProcessedRequest;
