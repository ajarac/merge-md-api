"use strict";
const fs = require('fs');
class CreateFile {
    constructor(_name, _content) {
        this._name = _name;
        this._content = _content;
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
    createFile() {
        if (!this._content || this._name) {
            return false;
        }
        else {
            fs.
            ;
        }
    }
}
exports.CreateFile = CreateFile;
