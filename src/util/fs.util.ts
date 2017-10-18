import * as fs from 'fs';
import { FileClass } from '../class/file';

export class FsUtil {

    /**
     * Save File with extension .md
     * @param  {FileClass} file
     * @param  {any} callback
     * @returns any
     */
    public saveFile(file: FileClass, callback: any): any {
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
    public getFile(name: string): FileClass {
        if (!this.checkIfFileExists(name)) {
            return null;
        } else {
            let a = this.getFileByName(name);
            console.log(a);
            return a;
        }
    }

    public mergeFiles(file1: FileClass, extend: FileClass): FileClass {
        let finalFile: FileClass;

        return finalFile;
    }


    /**
     * Check if File exists or not, returns true/false if exists or not
     * @param  {string} name
     * @returns boolean
     */
    private checkIfFileExists(name: string): boolean {
        return fs.existsSync(name);
    }

    /**
     * Get File By Name
     * @param  {string} name
     * @returns any
     */
    private getFileByName(name: string): any {
        return fs.readFileSync(FileClass.getPath(name));
    }
}