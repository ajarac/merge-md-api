'use strict';
const path = 'data/';
class FileClass {
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
    static getPath(name) {
        return path + name + '.md';
    }
}
exports.FileClass = FileClass;
