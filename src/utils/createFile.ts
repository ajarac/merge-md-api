import * as fs from 'fs';


export class CreateFile {

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

    public createFile(): boolean {
        if (!this._content || this._name) {
            return false;
        } else {
            fs.
        }
    }

}