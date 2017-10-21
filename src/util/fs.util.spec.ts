import {} from 'jasmine';
import FsUtil from './fs.util';
import {FileClass} from '../class/file';

const file1: FileClass = new FileClass(
    'file',
    'Testing unit test\nContent file1'
);
const extend: FileClass = new FileClass(
    'extend',
    'Testing unit test\nContent extend'
);

describe('Test Fs Util', () => {
    it('Save File', (done) => {
        let promises: Promise<FileClass> [] = [FsUtil.saveFile(file1), FsUtil.saveFile(extend)];
        Promise
            .all(promises)
            .then((filesClass : FileClass[]) => {
                filesClass.forEach((file : FileClass) => {
                    expect(file.content).toEqual(jasmine.any(String));
                    expect(file.name).toEqual(jasmine.any(String));
                });
                done();
            });

    });

    it('Get File', (done) => {
        FsUtil
            .getFile(file1.name)
            .then((fileClass : FileClass) => {
                expect(fileClass.content).toEqual(jasmine.any(String));
                expect(fileClass.name).toEqual(jasmine.any(String));
                done();
            });
    });

    it('Merge Files', (done) => {
        FsUtil
            .mergeFiles(file1.name, extend.name)
            .then((finalFile : FileClass) => {
                expect(finalFile.content).toEqual(jasmine.any(String));
                expect(finalFile.name).toEqual(jasmine.any(String));
                done();
            });
    });
});