"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InMemoryProvider_1 = require("../providers/InMemoryProvider");
class AdminRouter {
    /**
     * Initialize the AdminRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all services.
     */
    getAll(req, res, next) {
        res.send(new InMemoryProvider_1.InMemoryProvider().getServices());
    }
    /**
     * GET one service by name
     */
    getOne(req, res, next) {
        let name = req.params.name;
        var service = new InMemoryProvider_1.InMemoryProvider().getService(name);
        if (service) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                service
            });
        }
        else {
            res.status(404)
                .send({
                message: name + ' service not found.'
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
