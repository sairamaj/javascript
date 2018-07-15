"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceManagerFactory_1 = require("../providers/ServiceManagerFactory");
class ServiceRouter {
    /**
     * Initialize the ServiceRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * POST service
     */
    handle(req, res, next) {
        console.log('ServiceRouter handle:...>' + req.url);
        var requestData = Object.keys(req.body)[0];
        console.log('ServiceRouter handle body:...>' + requestData);
        var parts = req.url.split('/');
        var serviceName = parts[parts.length - 1];
        var processInfo = ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getResponse(serviceName, requestData);
        if (processInfo) {
            res.status(200).
                set({ 'content-type': 'text/xml; charset=utf-8' })
                .send(processInfo.response);
        }
        else {
            res.status(404)
                .send({
                message: 'no match found.'
            });
        }
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('*', this.handle);
    }
}
exports.ServiceRouter = ServiceRouter;
// Create the ServiceRouter, and export its configured Express.Router
const serviceRoutes = new ServiceRouter();
serviceRoutes.init();
exports.default = serviceRoutes.router;
