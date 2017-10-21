"use strict";
const fs_util_1 = require('./fs.util');
const file_1 = require('../class/file');
const file1 = new file_1.FileClass('file', 'Testing unit test\nContent file1');
const extend = new file_1.FileClass('extend', 'Testing unit test\nContent extend');
describe('Test Fs Util', () => {
    it('Save File', (done) => {
        let promises = [fs_util_1.default.saveFile(file1), fs_util_1.default.saveFile(extend)];
        Promise
            .all(promises)
            .then((filesClass) => {
            filesClass.forEach((file) => {
                expect(file.content).toEqual(jasmine.any(String));
                expect(file.name).toEqual(jasmine.any(String));
            });
            done();
        });
    });
    it('Get File', (done) => {
        fs_util_1.default
            .getFile(file1.name)
            .then((fileClass) => {
            expect(fileClass.content).toEqual(jasmine.any(String));
            expect(fileClass.name).toEqual(jasmine.any(String));
            done();
        });
    });
    it('Merge Files', (done) => {
        fs_util_1.default
            .mergeFiles(file1.name, extend.name)
            .then((finalFile) => {
            expect(finalFile.content).toEqual(jasmine.any(String));
            expect(finalFile.name).toEqual(jasmine.any(String));
            done();
        });
    });
});
