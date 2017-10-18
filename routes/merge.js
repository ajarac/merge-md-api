'use strict';
const express = require('express');
var Route;
(function (Route) {
    class MergeMethods {
        getMerge(req, res, next) {
            res.status(200).send({ name: 'test' });
        }
        createFiles(req, res, next) {
            let fileBase = req.body;
        }
    }
    class Merge {
        constructor() {
            this.router = express.Router();
            this.mergeMethods = new MergeMethods();
            this.router.get('/', this.mergeMethods.getMerge.bind(this.mergeMethods.getMerge));
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
