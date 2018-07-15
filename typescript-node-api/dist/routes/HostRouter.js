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
     * GET host
     */
    getAll(req, res, next) {
        console.log('HostRouter getAll:...>' + req.url);
        res.send({
            message: 'processing host...'
        });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
    }
}
exports.HostRouter = HostRouter;
// Create the AdminRouter, and export its configured Express.Router
const hostRoutes = new HostRouter();
hostRoutes.init();
exports.default = hostRoutes.router;
