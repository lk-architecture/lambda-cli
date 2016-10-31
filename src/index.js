#!/usr/bin/env node

import "babel-polyfill";

import vorpal from "vorpal";

import initCommand from "./commands/init";

const cli = vorpal();

cli
    .command("init", "Init local lambda.")
    .action(initCommand);

cli
    .delimiter("lk-lambda-cli$")
    .parse(process.argv);

export default cli;
