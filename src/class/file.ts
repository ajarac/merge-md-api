import * as fs from 'fs';

const path: string = 'data/';

export class FileClass {


    constructor(
        private _name: string,
        private _content: string) { }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get content(): string {
        return this._content;
    }

    set content(content: string) {
        this._content = content;
    }


    /**
     * Create path with extension .md
     * @returns string
     */
    public static getPath(name: string): string {
        return path + name + '.md';
    }

}