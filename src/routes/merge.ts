/// <reference path="../_all.d.ts" />
'use strict';

import * as express from 'express';
import {FileBase} from '../entities/file.entities';
import {FileClass} from '../class/file';
import FsUtil from '../util/fs.util';

namespace Route {
    class MergeMethods {
        /**
         * Create the merge and return it
         * @param  {express.Request} req
         * @param  {express.Response} res
         * @param  {express.NextFunction} next
         */
        public getMerge(
            req : express.Request,
            res : express.Response,
            next : express.NextFunction
        ) {
            if (!req.query.hasOwnProperty('fichero1') || !req.query.hasOwnProperty('extend')) {
                return res
                    .status(400)
                    .send({error: 'Missing "fichero1" and/or "extend"'});
            } else {
                FsUtil
                    .mergeFiles(req.query.fichero1, req.query.extend)
                    .then((file : FileClass) => res.status(200).send(file.json()))
                    .catch(err => next(err));
            }
        }

        /**
         * Create file with extension .md to ready test merge
         * @param  {express.Request} req
         * @param  {express.Response} res
         * @param  {express.NextFunction} next
         */
        public createFiles(
            req : express.Request,
            res : express.Response,
            next : express.NextFunction
        ) {
            let fileBase: FileBase = req.body;
            let fileClass: FileClass = new FileClass(fileBase.name, fileBase.content);
            FsUtil
                .saveFile(fileClass)
                .then(() => res.status(200).send(fileClass.json()))
                .catch(err => next(err));
        }
    }

    class Merge {
        public router: express.Router = express.Router();

        private mergeMethods: MergeMethods = new MergeMethods();

        constructor() {
            this
                .router
                .get('/', this.mergeMethods.getMerge.bind(this.mergeMethods.getMerge));
            this
                .router
                .post('/', this.mergeMethods.createFiles.bind(this.mergeMethods.createFiles));
        }
    }

    export class Routes {
        public router: express.Router = express.Router();

        private merge: Merge = new Merge();

        constructor() {
            this
                .router
                .use('/merge', this.merge.router.bind(this.merge.router));
        }
    }
}

export = Route;
