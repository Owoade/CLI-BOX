const { transform } = require("./mongoose-models");

function controllerTemplate(name){
    return `
        export function get${transform(name)} ( req, res ){


        }

        export function get${transform(name)}s ( req, res ){


        }

        export function update${transform(name)} ( req, res ){


        }

        export function delete${transform(name)} ( req, res ){


        }
    `
}



module.exports = controllerTemplate;
