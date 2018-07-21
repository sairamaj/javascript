import { Router, Request, Response, NextFunction } from 'express';
import { ServiceManagerFactory } from '../providers/ServiceManagerFactory';
import { MapDetail } from '../model/MapDetail';
import { resolve } from 'path';
import debugx = require('debug');
let debug = debugx('adminrouter');

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
        .send(service);
    }
    else {
      res.status(404)
        .send({
          message: name + ' service not found.'
        });
    }
  }

  public async getProcessedRequests(req: Request, res: Response) {
    let name = req.params.name;
    var processedRequests = await ServiceManagerFactory.createServiceManager().getProcessedRequests(name);
    res.send(processedRequests);
  }

  public async deleteProcessedRequests(req: Request, res: Response) {
    let name = req.params.name;
    var result = await ServiceManagerFactory.createServiceManager().clearProcessedRequests(name);
    if (result) {
      res.status(200).send([])
    } else {
      res.status(500).send([])
    }
  }

  public async getMapDetails(req: Request, res: Response) {
    debug('enter getMapDetail.')
    let serviceName = req.params.name;
    let mapName = req.params.mapName;

    // return new Promise<MapDetail>((resolve, reject) => {
    //   resolve(new MapDetail("map1", "request here", "response here", ["match1", "match2"]));
    // });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:name', this.getOne)
    this.router.get('/:name/processedrequests', this.getProcessedRequests)
    this.router.delete('/:name/processedrequests', this.deleteProcessedRequests)
    this.router.get('/:name/maps/:mapName', this.getMapDetails)

  }

}

// Create the AdminRouter, and export its configured Express.Router
const adminRoutes = new AdminRouter();
adminRoutes.init();

export default adminRoutes.router;