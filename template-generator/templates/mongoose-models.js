class MongooseModel {

    template( payload ){
        const { name, model } = payload;
        return `
        import mongoose from "mongoose"

        const ${name}Model = {
            ${ this.getAttributeObjects(model) }
        }

        export const ${ this.transform(name) } =  mongoose.model("${this.transform(name)}",${name}Model)
        `
    }

    getAttributeObjects( attributes ){
        const attributes_arr = Object.keys(attributes);
        let template = ``;

        for( let i = 0; i < attributes_arr.length; i++ ){
            const attribute = attributes_arr[i];

            template+=`
            ${attribute}:{
                type: ${ this.transform( attributes[attribute]) },
                required: true
            }
            ${i !== attributes_arr.length - 1 ? ",\n" : ""}
            `
        }

        return template.trim();
    }
    transform(type){
        return type.split("").map( (char, i) => i === 0 ? char.toUpperCase() : char  ).join("")
    }

}

module.exports = new MongooseModel();
