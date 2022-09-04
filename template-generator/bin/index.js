#!/usr/bin/env node

const cli = require("commander");
const buildModel = require("../actions/buildModel");
const buildApp = require("../actions/buildApp");

cli.description("A CLI Tool for generating  boilerplates");
cli.name("Template generator");
cli.usage("<command>");
cli.helpOption(false);

cli.command("model")
    .argument("<object>", "model")
    .description("Retrieve name of user")
    .action(buildModel)

cli.command("app")
    .option("--http", "Generates a express-http boilerplate")
    .option("--ws", "Generates a express-socket.io boilerplate")
    .action(buildApp)

cli.parse(process.argv)



