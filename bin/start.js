#! /usr/bin/env node
const program = require("commander");
const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const inquirer = require("inquirer");//命令行交互
const { resolve } = require("path");

const proj = {
	full: {
		name: "Full stack",
		rep: "edwardzhong/fullstack-template"
	},
	page: {
		name: "Html page",
		rep: "edwardzhong/static-page-project"
	},
	react: {
		name: "React",
		rep: "edwardzhong/webpack_react"
	},
	vue: {
		name: "Vue",
		rep: "edwardzhong/hello_vue"
	},
	server: {
		name: "Static server",
		rep: "edwardzhong/static-server"
	}
};

const promptList = [
	{
		type: "input",
		message: "input project folder name:",
		name: "folder",
		default: ""
	},
	{
		type: "rawlist",
		message: "select project type:",
		name: "type",
		choices: [
			{
				name: "Full stack",
				value: "full"
			},
			{
				name: "Html page",
				value: "page"
			},
			{
				name: "React",
				value: "react"
			},
			{
				name: "Vue",
				value: "vue"
			},
			{
				name: "Static server",
				value: "server"
			}
		]
	}
];

//全局命令 project -f abc
program
	.version("0.1.0")
	.option("-f, full <name>", "Full stack")
	.option("-p, page <name>", "Html page")
	.option("-r, react <name>", "React")
	.option("-v, vue <name>", "Vue")
	.option("-s, server <name>", "Static server")
	.parse(process.argv);

if (program.full) downloadFn(proj.full, program.full);
if (program.page) downloadFn(proj.page, program.page);
if (program.react) downloadFn(proj.react, program.react);
if (program.vue) downloadFn(proj.vue, program.vue);
if (program.server) downloadFn(proj.server, program.server);

//process.argv 参数信息
//process.cwd() 命令执行目录
function downloadFn(obj, dir) {
	const spinner = ora( `Downloading ${obj.name} project template from github` ).start();
	download( obj.rep, dir ? resolve(process.cwd(), dir) : process.cwd(), function(err) {
		if (!err) {
			spinner.succeed(chalk.green( `Download ${obj.name} success !` ));
		} else {
			spinner.fail(chalk.red(`Download ${obj.name} fail !`));
		}
	});
}

//创建git风格的子命令 project init abc
program
	.command("create")
	.alias("c")
	.description("Initialization project")
	.action(() => {
		inquirer.prompt(promptList).then(answer => {
			downloadFn(proj[answer.type], answer.folder);
		});
	});

program.parse(process.argv);
