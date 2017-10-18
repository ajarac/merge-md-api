"use strict";
const fs = require('fs');
class CreateFileUtil {
    constructor(_name, _content) {
        this._name = _name;
        this._content = _content;
        this.path = 'data/';
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
    }
    createFile(callback) {
        if (!this._content || !this._name) {
            callback('Missing content and name');
        }
        else {
            fs.writeFile(this.getPath(), this._content, callback);
        }
    }
    getPath() {
        return this.path + this._name + '.md';
    }
}
exports.CreateFileUtil = CreateFileUtil;
