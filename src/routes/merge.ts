/// <reference path="../_all.d.ts" />
'use strict';

import * as express from 'express';
import { FileBase } from '../entities/file.entities';


module Route {

    class MergeMethods {
        public getMerge(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(200).send({ name: 'test' });
        }

        public createFiles(req: express.Request, res: express.Response, next: express.NextFunction) {
            let fileBase: FileBase = req.body;

        }

    }

    class Merge {
        public router: express.Router = express.Router();

        private mergeMethods: MergeMethods = new MergeMethods();

        constructor() {
            this.router.get('/', this.mergeMethods.getMerge.bind(this.mergeMethods.getMerge));
            this.router.post('/', this.mergeMethods.createFiles.bind(this.mergeMethods.createFiles));
        }
    }

    export class Routes {
        public router: express.Router = express.Router();

        private merge: Merge = new Merge();

        constructor() {
            this.router.use('/merge', this.merge.router.bind(this.merge.router));
        }

    }

}

export = Route;