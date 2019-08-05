#! /usr/bin/env node
const program = require("commander");
const download = require("download-git-repo");
const chalk = require("chalk");
const ora = require("ora");
const { resolve } = require("path");

//全局命令 project -f abc
program
	.version("0.1.0")
	.option("-f, full [name]", "FullStack project")
	.option("-p, page [name]", "Html Page project")
	.option("-r, react [name]", "React project")
	.option("-v, vue [name]", "Vue project")
	.option("-s, static [name]", "Static server")
	.parse(process.argv);

if (program.full) {
	downloadFn("fullstack","edwardzhong/fullstack-template", program.full);
}
if (program.page) {
	downloadFn("html page","edwardzhong/static-page-project", program.page);
}
if (program.react) {
	downloadFn("react","edwardzhong/webpack_react", program.react);
}
if (program.vue) {
	downloadFn("vue","edwardzhong/hello_vue", program.vue);
}
if (program.static) {
	downloadFn("static server","edwardzhong/static-server", program.static);
}

//创建git风格的子命令 project init abc
program
	.command("init <cmd>")
	.alias("i")
	.description("Initialization project")
	.action(function(cmd, options) {
		console.log("Initialization project", cmd, options);
	});

program.parse(process.argv);

//process.argv 参数信息
//process.cwd() 命令执行目录
function downloadFn(name, rep, dir) {
	const spinner = ora(`Downloading ${name} project template from github`).start();
	download(rep, resolve(process.cwd(), dir), function(err) {
		if (!err) {
			spinner.succeed(chalk.green("Download success !"));
		} else {
			spinner.fail(chalk.red("Download github repository fail !"));
		}
	});
}
