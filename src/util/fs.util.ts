/// <reference path="../_all.d.ts" />
'use strict';

import * as fs from 'fs';
import { FileClass } from '../class/file';


export default class FsUtil {

    /**
     * Save File with extension .md
     * @param  {FileClass} file
     * @param  {any} callback
     * @returns any
     */
    public static saveFile(file: FileClass, callback: any): any {
        if (!file.name || !file.content) {
            callback('Missing content and name');
        } else {
            fs.writeFile(FileClass.getPath(file.name), file.content, callback);
        }
    }

    /**
     * Public Get File 
     * @param  {string} name
     * @returns FileClass
     */
    public static getFile(name: string, callback: any) {
        let path: string = FileClass.getPath(name);

        fs.exists(path, (exists) => {
            console.log('EXISSTS', exists);
            if (exists) {
                fs.readFile(path, callback);
            } else {
                callback(null);
            }
        });
    }

    public static mergeFiles(file1: FileClass, extend: FileClass): FileClass {
        let finalFile: FileClass;

        return finalFile;
    }

}