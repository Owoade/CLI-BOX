const expressWsTemlaplate = require("../templates/ws-express");
const expressHttpTemplate = require("../templates/http-express");
const fs = require("fs");
const { format } = require("prettier");

function buildApp(args) {
    return fs.writeFileSync(
        "app.js",
        format(args.http || !args.ws ? expressHttpTemplate() : expressWsTemlaplate(),
            { semi: false, parser: "babel" })
    )
}

module.exports = buildApp;
