import { Router, Request, Response, NextFunction } from 'express';
import { ServiceManagerFactory } from '../providers/ServiceManagerFactory';
var debug = require('debug')('servicerouter')

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
    public async handle(req: Request, res: Response, next: NextFunction) {
        try {
            var requestData = await this.getRequest(req);
            var parts = req.url.split('/')
            var serviceName = parts[parts.length - 1]
            var processInfo = await ServiceManagerFactory.createServiceManager().getResponse(serviceName, requestData);
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
        } catch (error) {
            debug('error:' + error)
            res.status(500)
                .send(error);
        }
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        //   this.router.post('*', this.handle);
        this.router.post('*', async (req: Request, resp: Response) => {
            await this.handle(req, resp, null);
        });
    }

    async getRequest(req: Request): Promise<string> {
        return new Promise<string>((resolve,reject) => {
            var requestData = JSON.stringify(req.body)
            if( requestData !== undefined && requestData.length > 2){
                resolve(JSON.stringify(requestData));
            }else{
                requestData = '';
                req.on('data', chunk => {
                    requestData += chunk;
                });
    
                req.on('end', (err, data) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(requestData);
                    }
                });
            }
        });
    }
}

// Create the ServiceRouter, and export its configured Express.Router
const serviceRoutes = new ServiceRouter();
serviceRoutes.init();

export default serviceRoutes.router;

