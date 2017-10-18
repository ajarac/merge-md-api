'use strict';
const express = require('express');
const mergeRoute = require('./merge');
var Route;
(function (Route) {
    class Index {
        index(req, res, next) {
            res.render('index');
        }
    }
    class Routes {
        constructor() {
            this.router = express.Router();
            this.index = new Index();
            this.mergeRoute = new mergeRoute.Routes();
            this.router.get('/', this.index.index.bind(this.index.index));
            this.router.use('/api', this.mergeRoute.router.bind(this.mergeRoute.router));
        }
    }
    Route.Routes = Routes;
})(Route || (Route = {}));
module.exports = Route;
