import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import AdminRouter from './routes/AdminRouter';
import HostRouter from './routes/HostRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up a
    nd running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    this.express.use('/api/v1/admin/hosts', AdminRouter);
    this.express.all("*", HostRouter)
    //this.express.use('*', HostRouter);
    // this.express.use((req, res) => {
    //   console.log('in default...')
    //   new HostRouter(req, res, null).handle()
    // });
  }

}

export default new App().express;