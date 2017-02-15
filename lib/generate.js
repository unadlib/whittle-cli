/**
 * Author   : unadlib
 * Date     : 2017/2/14
 * Time     : 16:39
 * Project [ whittle-cli ] Coded on WebStorm.
 */

'use strict';
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const ejs = require('ejs');
const glob = require('glob');
const co = require('co');

module.exports = (input, tmpPath, toPath, done, error) => {
    let templatePath = path.join(tmpPath, 'template/**');
    var sum = 0;
    var i = 0;
    glob(templatePath, {}, function (er, files) {
        co(function *() {
            files.map(function (item) {
                let isDirectory = fs.lstatSync(item).isDirectory();
                if (isDirectory) return;
                sum++;
                ejs.renderFile(item, {data: input}, {}, function (err, str) {
                    if (err) {
                        console.log(err);
                        process.exit();
                    }
                    fs.writeFile(item, str, 'utf8', function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            i++;
                            if (i === sum) {
                                last(done, tmpPath, path.join(toPath, input.name))
                            };
                        }
                    });
                });
            });
        }).then(function () {
            // Read the end of the files
        }, function (e) {
            error(e);
        });
    });

}

function last(done, tmpPath, toPath) {
    let mvCommander;
    tmpPath = path.join(tmpPath, 'template');
    mvCommander = `mv ${tmpPath} ${toPath}`;
    execSync(mvCommander);
    done();
}