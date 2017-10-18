"use strict";
const fs = require('fs');
const file_1 = require('../class/file');
class FsUtil {
    saveFile(file, callback) {
        if (!file.name || !file.content) {
            callback('Missing content and name');
        }
        else {
            fs.writeFile(file_1.FileClass.getPath(file.name), file.content, callback);
        }
    }
    getFile(name) {
        if (!this.checkIfFileExists(name)) {
            return null;
        }
        else {
            let a = this.getFileByName(name);
            console.log(a);
            return a;
        }
    }
    mergeFiles(file1, extend) {
        let finalFile;
        return finalFile;
    }
    checkIfFileExists(name) {
        return fs.existsSync(name);
    }
    getFileByName(name) {
        return fs.readFileSync(file_1.FileClass.getPath(name));
    }
}
exports.FsUtil = FsUtil;
