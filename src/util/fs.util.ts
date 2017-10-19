/// <reference path="../_all.d.ts" />
'use strict';

import * as fs from 'fs';
import {FileClass} from '../class/file';

export default class FsUtil {
    /**
     * Save File with extension .md
     * @param  {FileClass} file
     * @param  {any} callback
     * @returns any
     */
    public static saveFile(file : FileClass): Promise<FileClass> {
        return new Promise((resolve, reject) => {

            if (!file.name || !file.content) {
                reject(new Error('Missing content and name'));
            } else {
                fs.writeFile(FileClass.getPath(file.name), file.content, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(file);
                    }
                });
            }
        });
    }

    /**
     * Public Get File
     * @param  {string} name
     * @returns FileClass
     */
    public static getFile(name : string): Promise<FileClass> {
        let path: string = FileClass.getPath(name);

        return new Promise((resolve, reject) => {
            fs.exists(path, exists => {
                if (exists) {
                    fs.readFile(path, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(FsUtil.convertStreamToFile(name, result));
                        }
                    });
                } else {
                    reject(new Error(`File ${name} does not exists`));
                }
            });
        });
    }

    /**
     * Convert Buffer stream to File Class
     * @param  {string} name
     * @param  {Buffer} stream
     * @returns FileClass
     */
    public static convertStreamToFile(name : string, stream : Buffer): FileClass {
        let fileClass: FileClass = new FileClass(name, null);
        fileClass.content = new Buffer(stream).toString();
        return fileClass;
    }

    /**
     * Merge Files
     * @param  {string} file1
     * @param  {string} extend
     * @returns Promise
     */
    public static mergeFiles(file1 : string, extend : string): Promise<FileClass> {
        return new Promise((resolve, reject) => {
            Promise
                .all([FsUtil.getFile(file1), FsUtil.getFile(extend)])
                .then((files : Array<FileClass>) => {
                    resolve(FsUtil.compareFiles(files));
                })
                .catch(reject);
        });
    }

    /**
     * @param  {FileClass[]} files
     * @returns FileClass
     */
    private static compareFiles(files : FileClass[]): FileClass {
        let file: FileClass = files[0];
        let extend: FileClass = files[1];

        let contentFile: string = file.content;
        let contentExtend: string = extend.content;

        let sentenceFile: string[] = contentFile.split('\n');
        let sentenceExtend: string[] = contentExtend.split('\n');
        let sentenceFinal: string[] = JSON.parse(JSON.stringify(sentenceFile));

        sentenceExtend.forEach((sentExtend : string) => {
            let findIndex: number = sentenceFile.findIndex(v => v === sentExtend);
            if (findIndex === -1) {
                sentenceFinal.push(sentExtend);
            }
        });
        let contentFinal: string = '';

        sentenceFinal.forEach((sent : string, index : number) => {
            if (index === 0) {
                contentFinal += `${sent}`;
            } else {
                contentFinal += `\n${sent}`;
            }
        });

        return new FileClass(file.name, contentFinal);
    }
}
