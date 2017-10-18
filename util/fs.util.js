'use strict';
const fs = require('fs');
const file_1 = require('../class/file');
class FsUtil {
    static saveFile(file, callback) {
        if (!file.name || !file.content) {
            callback('Missing content and name');
        }
        else {
            fs.writeFile(file_1.FileClass.getPath(file.name), file.content, callback);
        }
    }
    static getFile(name, callback) {
        let path = file_1.FileClass.getPath(name);
        fs.exists(path, (exists) => {
            console.log('EXISSTS', exists);
            if (exists) {
                fs.readFile(path, callback);
            }
            else {
                callback(null);
            }
        });
    }
    static mergeFiles(file1, extend) {
        let finalFile;
        return finalFile;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FsUtil;
