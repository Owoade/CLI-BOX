const { inspect } = require("util");

function literalModel({ name, model }) {
    return `
       export const ${name} = {
        ${createLiteralObject(model)}
       }

    `.trim()
}

function createLiteralObject(model) {
    const key_arr = Object.keys(model);
    let str = ""

    for (i = 0; i < key_arr.length; i++) {
        const key = key_arr[i]
        str += `${key}:${model[key]}${i < key_arr.length - 1 ? ",\n" : ""}`
    }

    return str;
}

module.exports = literalModel
