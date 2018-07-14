import {Router, Request, Response, NextFunction} from 'express';
const Hosts = require('../hosts');

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
   * GET all Hosts.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Hosts);
  }

/**
 * GET one host by name
 */
public getOne(req: Request, res: Response, next: NextFunction) {
    let query = req.params.name;
    let host = Hosts.find(host => host.name === query);
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
          message: 'No host found with the given name.',
          status: res.status
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