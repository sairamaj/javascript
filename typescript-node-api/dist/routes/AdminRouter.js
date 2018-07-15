"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HostManager_1 = require("../HostManager");
class AdminRouter {
    /**
     * Initialize the AdminRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Hosts.
     */
    getAll(req, res, next) {
        res.send(new HostManager_1.HostManager().getHosts());
    }
    /**
     * GET one host by name
     */
    getOne(req, res, next) {
        let name = req.params.name;
        var host = new HostManager_1.HostManager().getHost(name);
        if (host) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                host
            });
        }
        else {
            res.status(404)
                .send({
                message: name + ' host not found.'
            });
        }
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:name', this.getOne);
    }
}
exports.AdminRouter = AdminRouter;
// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new AdminRouter();
adminRoutes.init();
exports.default = adminRoutes.router;
