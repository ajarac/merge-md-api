'use strict';
const express = require('express');
const file_1 = require('../class/file');
const fs_util_1 = require('../util/fs.util');
var Route;
(function (Route) {
    class MergeMethods {
        getMerge(req, res, next) {
            if (!req.query.hasOwnProperty('fichero1') || !req.query.hasOwnProperty('extend')) {
                return res
                    .status(400)
                    .send({ error: 'Missing "fichero1" and/or "extend"' });
            }
            else {
                fs_util_1.default
                    .mergeFiles(req.query.fichero1, req.query.extend)
                    .then((file) => res.status(200).send(file.json()))
                    .catch(err => next(err));
            }
        }
        createFiles(req, res, next) {
            let fileBase = req.body;
            let fileClass = new file_1.FileClass(fileBase.name, fileBase.content);
            fs_util_1.default
                .saveFile(fileClass)
                .then(() => res.status(200).send(fileClass.json()))
                .catch(err => next(err));
        }
    }
    class Merge {
        constructor() {
            this.router = express.Router();
            this.mergeMethods = new MergeMethods();
            this
                .router
                .get('/', this.mergeMethods.getMerge.bind(this.mergeMethods.getMerge));
            this
                .router
                .post('/', this.mergeMethods.createFiles.bind(this.mergeMethods.createFiles));
        }
    }
    class Routes {
        constructor() {
            this.router = express.Router();
            this.merge = new Merge();
            this
                .router
                .use('/merge', this.merge.router.bind(this.merge.router));
        }
    }
    Route.Routes = Routes;
})(Route || (Route = {}));
module.exports = Route;
