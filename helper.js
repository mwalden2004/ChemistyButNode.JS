const toCalculate = "CH3OH";
const table = require("./table");

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function round(num, to){
    return parseFloat(num.toFixed(to));
}

function calculateInfoOnElement(element){
    const atomicNumber = Object.keys(table).findIndex(a => a == element)+1;
    const atomicWeight = table[element].mass;

    return {
        proton: atomicNumber,
        neutron: round(atomicWeight - atomicNumber, 0),
        electrons: atomicNumber
    }
}

console.log(calculateInfoOnElement("Kr"))

function intermolecularForces(formula){
    const forces = ["LDF"];

    let input = formula.split(/(?=[A-Z])/);
    input = input.map(a => a.split(/(\d+)/)) // split into capital letter groups
    input = input.map(a => a.filter(a => a !== "" && isNumeric(a) == false )) // split into elements remove all numbers
    input = input.map(a=> a[0]); // turn into array of elements

    const containsNOF = input.find(a => a == "N" || a == "O" || a == "F") !== undefined;


    return forces;
}

intermolecularForces(toCalculate)

function calculateMass(formula) {
    let input = formula.split(/(?=[A-Z])/);
    input = input.map(a => a.split(/(\d+)/)) // split into capital letter groups
    input = input.map(a => a.filter(a => a !== "")) // split into elements and numbers
    input = input.map(a => a.map(a => isNumeric(a) == true ? parseFloat(a) : a)) // turn numbers into double ints

    //we can finally calculate some stuff
    let calculatedMass = 0;

    for (i = 0; i < input.length; i++) {
        const element = input[i][0];
        const num = input[i][1] || 1;

        if (table[element]) {
            const elementMass = table[element].mass;
            calculatedMass += elementMass * num;
        }
    }

    return calculatedMass
}


console.log(round(calculateMass(toCalculate), 2))