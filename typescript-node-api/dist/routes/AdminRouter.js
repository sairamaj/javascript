"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ServiceManagerFactory_1 = require("../providers/ServiceManagerFactory");
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
        return __awaiter(this, void 0, void 0, function* () {
            var services = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getServices();
            res.send(services);
        });
    }
    /**
     * GET one service by name
     */
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = req.params.name;
            var service = yield ServiceManagerFactory_1.ServiceManagerFactory.createServiceManager().getService(name);
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
        });
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
