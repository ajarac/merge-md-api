'use strict';
const fs = require('fs');
const file_1 = require('../class/file');
class FsUtil {
    static saveFile(file) {
        return new Promise((resolve, reject) => {
            if (!file.name || !file.content) {
                reject(new Error('Missing content and name'));
            }
            else {
                fs.writeFile(file_1.FileClass.getPath(file.name), file.content, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(file);
                    }
                });
            }
        });
    }
    static getFile(name) {
        let path = file_1.FileClass.getPath(name);
        return new Promise((resolve, reject) => {
            fs.exists(path, exists => {
                if (exists) {
                    fs.readFile(path, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(FsUtil.convertStreamToFile(name, result));
                        }
                    });
                }
                else {
                    reject(new Error(`File ${name} does not exists`));
                }
            });
        });
    }
    static mergeFiles(file1, extend) {
        return new Promise((resolve, reject) => {
            Promise
                .all([FsUtil.getFile(file1), FsUtil.getFile(extend)])
                .then((files) => {
                resolve(FsUtil.compareFiles(files));
            })
                .catch(reject);
        });
    }
    static convertStreamToFile(name, stream) {
        let fileClass = new file_1.FileClass(name, null);
        fileClass.content = new Buffer(stream).toString();
        return fileClass;
    }
    static compareFiles(files) {
        let file = files[0];
        let extend = files[1];
        let contentFile = file.content;
        let contentExtend = extend.content;
        let sentenceFile = contentFile.split('\n');
        let sentenceExtend = contentExtend.split('\n');
        let sentenceFinal = JSON.parse(JSON.stringify(sentenceFile));
        sentenceExtend.forEach((sentExtend) => {
            let findIndex = sentenceFile.findIndex(v => v === sentExtend);
            if (findIndex === -1) {
                sentenceFinal.push(sentExtend);
            }
        });
        let contentFinal = '';
        sentenceFinal.forEach((sent, index) => {
            if (index === 0) {
                contentFinal += `${sent}`;
            }
            else {
                contentFinal += `\n${sent}`;
            }
        });
        return new file_1.FileClass(file.name, contentFinal);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FsUtil;
