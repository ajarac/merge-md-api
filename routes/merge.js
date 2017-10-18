'use strict';
const express = require('express');
const file_1 = require('../class/file');
const fs_util_1 = require('../util/fs.util');
var Route;
(function (Route) {
    class MergeMethods {
        constructor() {
            this.fsUtil = new fs_util_1.FsUtil();
        }
        getMerge(req, res, next) {
            if (!req.params.hasOwnProperty('fichero1') || !req.params.hasOwnProperty('extend')) {
                return res.status(400).send({ error: 'Missing "fichero1" and/or "extend"' });
            }
            let file1 = this.fsUtil.getFile(req.params.fichero1);
            let extend = this.fsUtil.getFile(req.params.extend);
            if (file1 === null || extend === null) {
                return res.status(404).send({ error: `Files ${req.params.fichero1} and/or ${req.params.extend} does not extist` });
            }
            else {
                this.fsUtil.mergeFiles(file1, extend);
                res.status(200).send({ name: 'test' });
            }
        }
        test(req, res, next) {
            return res.status(200).send(this.fsUtil.getFile('test'));
        }
        createFiles(req, res, next) {
            let fileBase = req.body;
            let fileClass = new file_1.FileClass(fileBase.name, fileBase.content);
            this.fsUtil.saveFile(fileClass, err => {
                if (err) {
                    res.status(400).send({ error: err, status: '400 Bad Request' });
                }
                else {
                    res.status(200).send(fileBase);
                }
            });
        }
    }
    class Merge {
        constructor() {
            this.router = express.Router();
            this.mergeMethods = new MergeMethods();
            this.router.get('/', this.mergeMethods.getMerge.bind(this.mergeMethods.getMerge));
            this.router.get('/test', this.mergeMethods.test.bind(this.mergeMethods.test));
            this.router.post('/', this.mergeMethods.createFiles.bind(this.mergeMethods.createFiles));
        }
    }
    class Routes {
        constructor() {
            this.router = express.Router();
            this.merge = new Merge();
            this.router.use('/merge', this.merge.router.bind(this.merge.router));
        }
    }
    Route.Routes = Routes;
})(Route || (Route = {}));
module.exports = Route;
