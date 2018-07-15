import { Router, Request, Response, NextFunction } from 'express';

export class HostRouter {
    router: Router

    /**
     * Initialize the AdminRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * POST host
     */
    public handle(req: Request, res: Response, next: NextFunction) {
        console.log('HostRouter handle:...>' + req.url)
        var parts = req.url.split('/')
        var hostName = parts[parts.length-1]
        res.status(200).
            set({ 'content-type': 'text/xml; charset=utf-8' })
            .send(hostName + ' here')
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('*', this.handle);
    }

}

// Create the AdminRouter, and export its configured Express.Router
const hostRoutes = new HostRouter();
hostRoutes.init();

export default hostRoutes.router;
//export default hostRoutes.handle;
