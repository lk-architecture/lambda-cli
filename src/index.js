import "babel-polyfill";

import vorpal from "vorpal";

import initCommand from "./commands/init";

const cli = vorpal();

cli
    .command("init", "Init local lambda.")
    .action(initCommand);

cli
    .delimiter("lambda-boilerplate-cli$")
    .show();

export default cli;
