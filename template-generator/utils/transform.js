function transform(string){
    return string.split("").map( (char, i) => i === 0 ? char.toUpperCase() : char  ).join("")
}
