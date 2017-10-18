/// <reference path="../_all.d.ts" />
'use strict';

import * as express from 'express';
import { FileBase } from '../entities/file.entities';
import { FileClass } from '../class/file';
import FsUtil from '../util/fs.util';
module Route {

    class MergeMethods {

        /**
         * Create the merge and return it
         * @param  {express.Request} req
         * @param  {express.Response} res
         * @param  {express.NextFunction} next
         */
        public getMerge(req: express.Request, res: express.Response, next: express.NextFunction) {
            if (!req.params.hasOwnProperty('fichero1') || !req.params.hasOwnProperty('extend')) {
                return res.status(400).send({ error: 'Missing "fichero1" and/or "extend"' });
            }
            let file1: FileClass = FsUtil.getFile(req.params.fichero1);
            let extend: FileClass = FsUtil.getFile(req.params.extend);

            if (file1 === null || extend === null) {
                return res.status(404).send({ error: `Files ${req.params.fichero1} and/or ${req.params.extend} does not extist` });
            } else {
                FsUtil.mergeFiles(file1, extend);

                res.status(200).send({ name: 'test' });
            }
        }

        public test(req: express.Request, res: express.Response, next: express.NextFunction) {
            FsUtil.getFile('test', (err, file) => {
                console.log('eeeeeeeeeeeeeeeeeeeeee', err, file);
                return res.status(200).send(file);
            });
        }

        /**
         * Create file with extension .md to ready test merge
         * @param  {express.Request} req
         * @param  {express.Response} res
         * @param  {express.NextFunction} next
         */
        public createFiles(req: express.Request, res: express.Response, next: express.NextFunction) {
            let fileBase: FileBase = req.body;
            let fileClass: FileClass = new FileClass(fileBase.name, fileBase.content);

            FsUtil.saveFile(fileClass, err => {
                if (err) {
                    res.status(400).send({ error: err, status: '400 Bad Request' });
                } else {
                    res.status(200).send(fileBase);
                }
            });
        }

    }

    class Merge {
        public router: express.Router = express.Router();

        private mergeMethods: MergeMethods = new MergeMethods();

        constructor() {
            this.router.get('/', this.mergeMethods.getMerge.bind(this.mergeMethods.getMerge));
            this.router.get('/test', this.mergeMethods.test.bind(this.mergeMethods.test));
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