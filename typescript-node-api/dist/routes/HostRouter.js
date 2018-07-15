"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HostRouter {
    /**
     * Initialize the AdminRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * POST host
     */
    handle(req, res, next) {
        console.log('HostRouter handle:...>' + req.url);
        var parts = req.url.split('/');
        var hostName = parts[parts.length - 1];
        res.status(200).
            set({ 'content-type': 'text/xml; charset=utf-8' })
            .send(hostName + ' here');
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('*', this.handle);
    }
}
exports.HostRouter = HostRouter;
// Create the AdminRouter, and export its configured Express.Router
const hostRoutes = new HostRouter();
hostRoutes.init();
exports.default = hostRoutes.router;
//export default hostRoutes.handle;
