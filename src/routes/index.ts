/// <reference path="../_all.d.ts" />
'use strict';

import * as express from 'express';
import * as mergeRoute from './merge';


module Route {

  class Index {

    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      //render page
      res.render('index');
    }

  }


  export class Routes {
    public router: express.Router = express.Router();

    private index: Index = new Index();
    private mergeRoute: mergeRoute.Routes = new mergeRoute.Routes();

    constructor() {
      this.router.get('/', this.index.index.bind(this.index.index));
      this.router.use('/api', this.mergeRoute.router.bind(this.mergeRoute.router));
    }

  }

}



export = Route;