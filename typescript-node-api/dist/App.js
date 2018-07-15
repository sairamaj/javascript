"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const AdminRouter_1 = require("./routes/AdminRouter");
const ServiceRouter_1 = require("./routes/ServiceRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        this.express.use('/api/v1/admin/services', AdminRouter_1.default);
        this.express.all("*", ServiceRouter_1.default);
    }
}
exports.default = new App().express;
