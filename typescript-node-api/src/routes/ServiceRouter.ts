import { Router, Request, Response, NextFunction } from 'express';
import { ServiceManagerFactory } from '../providers/ServiceManagerFactory';

export class ServiceRouter {
    router: Router

    /**
     * Initialize the ServiceRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * POST service
     */
    public handle(req: Request, res: Response, next: NextFunction) {
        console.log('ServiceRouter handle:...>' + req.url)
        var requestData = Object.keys(req.body)[0]
        console.log('ServiceRouter handle body:...>' + requestData)
        var parts = req.url.split('/')
        var serviceName = parts[parts.length - 1]
        var processInfo = ServiceManagerFactory.createServiceManager().getResponse(serviceName, requestData);
        if (processInfo) {
            res.status(200).
                set({ 'content-type': 'text/xml; charset=utf-8' })
                .send(processInfo.response)
        } else {
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

// Create the ServiceRouter, and export its configured Express.Router
const serviceRoutes = new ServiceRouter();
serviceRoutes.init();

export default serviceRoutes.router;

