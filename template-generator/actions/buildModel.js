const fs = require("fs");
const mongoose = require("../templates/mongoose-models")
const { format } = require("prettier");
const controllerTemplate  = require("../templates/controllers")

function buildModel(option) {
    const { model, name } = generateOptionObject(option)

    const cwd = process.cwd();

    if (!fs.existsSync(`${cwd}/models`)) fs.mkdirSync(`${cwd}/models`)
    if (!fs.existsSync(`${cwd}/controllers`)) fs.mkdirSync(`${cwd}/controllers`)

    fs.writeFile(`${cwd}/models/${name}.model.js`, format(mongoose.template({ name, model }), { semi: false, parser: "babel" }), (err) => {
        if (err) return console.log("something bad happened")
        console.log(">>> Generated models");

        fs.writeFileSync(`${cwd}/controllers/${name}.controller.js`, format(controllerTemplate(name), { semi: false, parser: "babel" }));
        console.log(">>> Genetrated controllers as well, you are wellcome")
    })

}

function generateOptionObject(string) {

    modelObj = {}

    const [name, object] = string.split("--")

    object.split("-")
        .forEach((each) => {
            const [key, value] = each.split(":");
            modelObj[key] = value;
        })

    return { model: modelObj, name }
}

module.exports = buildModel
