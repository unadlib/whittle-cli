/**
 * Author   : unadlib
 * Date     : 2017/2/13
 * Time     : 14:33
 * Project [ whittle-cli ] Coded on WebStorm.
 */

'use strict';

const execSync = require('child_process').execSync;
const os = require('os');
const path = require('path');
// const exec = require('child_process').exec;
// const exists = require('fs').existsSync;

const commander = require('commander');
const download = require('download-git-repo');
const rm = require('rimraf').sync;
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const INFO = require('../package');
const generate = require('../lib/generate');
const clone = commander.clone || false;

module.exports = () => {
    const args = commander.args;
    const length = args.length;
    const isString = typeof commander.args[0] === 'string';
    const hasSlash = isString && commander.args[0].indexOf('/') > -1;
    const options = {
        'Support mobile':'mobile',
        'Support IE8+':'ie8',
        'Export PHP Template':'php',
        'Import font-awesome':'fontawesome',
        'Import bootstrap':'bootstrap'
    }
    let input = {};
    if (length > 2 || hasSlash) {
        console.log(chalk.red('\n × Too many parameters or parameter input format is incorrect.'));
        process.exit();
    }
    if (isString) {
        start({name: commander.args[0]});
    } else {
        let choices = Object.keys(options).map(e=>{
            return {name:e};
        });
        inquirer.prompt([{
            type: 'input',
            message: 'Project Name:',
            name: 'name'
        }, {
            type: 'input',
            message: 'Description:',
            name: "description"
        },   {
            type: 'checkbox',
            message: 'Select feature options:',
            name: 'options',
            choices: choices
        }]).ui.process.subscribe(
            function (e) {
                if(e.name=='options'){
                    e.answer.map(e=>{
                        input[options[e]] = !0
                    });
                }else{
                    input[e.name] = e.answer;
                }
            },
            function () {
                console.log(chalk.red('\n × Failed to create project.'));
                process.exit();
            },
            function () {
                start(input);
            }
        )
    }

};

function start(input) {
    const templatePath = "/whittle-templates";
    const template = `${INFO.author.name}${templatePath}`;
    const tmpDir = os.tmpdir();
    const random = Math.random().toString(35).substr(2, 5);
    let tmpPath = `${tmpDir}${templatePath}${random}`;
    let toPath = path.resolve('.');
    let spinner = ora('Downloading template');
    Object.assign(input,getGitUser());
    spinner.start();
    downloadRepository(template,tmpPath,function (error) {
        //Todo Download setTimeout Event.
        spinner.stop();
        if(error){
            console.log(chalk.red('\n × Failed to download template.'));
            process.exit();
        }
        console.log(chalk.green('√ Download completed!'));
        spinner = ora('Generating repository');
        spinner.start();
        spinner.stop();
        getTemplate(input,tmpPath,toPath,function () {
            spinner.stop();
            console.log(chalk.green('√ Generation completed!'));
        });
    });
}

function downloadRepository(template, tmpPath, callback) {    ;
    download(template, tmpPath, {clone: clone}, function (error) {
        callback(error);
        process.on('exit', function () {
            rm(tmpPath);
        });
    });
}

function getTemplate(input,tmpPath, toPath, done) {
    generate(input, tmpPath, toPath, done, function (error) {
        console.log(chalk.red(error));
        process.exit();
    });
}

function getGitUser() {
    let user = {},author,email;
    try {
        author = execSync('git config --get user.name');
        email = execSync('git config --get user.email');
    } catch (e) {}
    user.author = author && author.toString().trim();
    user.email = email && (' <' + email.toString().trim() + '>');
    return user;
}