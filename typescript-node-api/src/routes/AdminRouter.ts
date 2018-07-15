import {Router, Request, Response, NextFunction} from 'express';
import { InMemoryProvider } from '../providers/InMemoryProvider';


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
    res.send(new InMemoryProvider().getHosts());
  }

/**
 * GET one host by name
 */
public getOne(req: Request, res: Response, next: NextFunction) {
    let name = req.params.name;
    var host = new InMemoryProvider().getHost(name)
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
    this.router.get('/:name', this.getOne)
  }

}

// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new AdminRouter();
adminRoutes.init();

export default adminRoutes.router;