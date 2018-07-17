import { Router, Request, Response, NextFunction } from 'express';
import { ServiceManagerFactory } from '../providers/ServiceManagerFactory';

export class AdminRouter {
  router: Router

  /**
   * Initialize the AdminRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * GET all services.
   */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    var services = await ServiceManagerFactory.createServiceManager().getServices();
    res.send(services);
  }

  /**
   * GET one service by name
   */
  public async getOne(req: Request, res: Response, next: NextFunction) {
    let name = req.params.name;
    var service = await ServiceManagerFactory.createServiceManager().getService(name)
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
    this.router.get('/:name', this.getOne)
  }

}

// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new AdminRouter();
adminRoutes.init();

export default adminRoutes.router;