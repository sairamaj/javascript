"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const AdminRouter_1 = require("./routes/AdminRouter");
const HostRouter_1 = require("./routes/HostRouter");
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
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        this.express.use('/api/v1/admin/hosts', AdminRouter_1.default);
        this.express.all("*", HostRouter_1.default);
        //this.express.use('*', HostRouter);
        // this.express.use((req, res) => {
        //   console.log('in default...')
        //   new HostRouter(req, res, null).handle()
        // });
    }
}
exports.default = new App().express;
