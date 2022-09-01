#!/usr/bin/env node

const cli = require("commander");
const fs = require("fs");
const { inspect } = require("util");
const literalModel = require("../templates/literal-models");
const { format } = require("prettier");
const mongoose = require("../templates/mongoose-models");
const controllerTemplate = require("../templates/controllers");
const expressHttpTemplate = require("../templates/http-express");
const expressWsTemlaplate = require("../templates/ws-express");

cli.description("This is my first CLI tool");
cli.name("Template generator");
cli.usage("<command>");
// cli.addHelpCommand(false);
cli.helpOption(false);

cli.command("model")
    .argument("<object>", "model")
    .description("Retrieve name of user")
    .action((option) => {
        function generateObject(string) {
            modelObj = {}
            const [name, object] = string.split("--")
            object.split("-")
                .forEach((each) => {
                    const [key, value] = each.split(":");
                    modelObj[key] = value;
                })

            return { model: modelObj, name }

        }

        const { model, name } = generateObject(option)

        const cwd = process.cwd();

        if(!fs.existsSync(`${cwd}/models`)) fs.mkdirSync("models")
        if(!fs.existsSync(`${cwd}/controllers`)) fs.mkdirSync("controllers")

        console.log(inspect(model))
        fs.writeFile(`${cwd}/models/${name}.model.js`, format(mongoose.template({ name, model }), { semi: false, parser: "babel" }), (err) => {
            if (err) return console.log("something bad happened")
            console.log(">>> Generated models");

            fs.writeFileSync(`${cwd}/controllers/${name}.controller.js`, format(controllerTemplate(name)));
            console.log(">>> Genetrated controllers as well, you are wellcome")
        })
    })

cli.command("app")
    .option("--http", "Generates a express-http boilerplate")
    .option("--ws", "Generates a express-socket.io boilerplate")
    .action((args) => {
        fs.writeFileSync(
            "app.js",
            format(args.http || !args.ws ? expressHttpTemplate() : expressWsTemlaplate(),
                { semi: false, parser: "babel" })
        )
    })

cli.parse(process.argv)

console.log(fs.existsSync(`${__dirname}/templates`));


