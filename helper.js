const toCalculate = "CH3OH";
const table = require("./table");

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function round(num, to){
    return parseFloat(num.toFixed(to));
}

function normalizeEquation(formula){
    let input = formula.split(/(?=[A-Z])/);
    input = input.map(a => a.split(/(\d+)/)) // split into capital letter groups
    input = input.map(a => a.filter(a => a !== "")) // split into elements and numbers
    input = input.map(a => a.map(a => isNumeric(a) == true ? parseFloat(a) : a)) // turn numbers into double ints

    return input;
}

function calculatePercentDifference(a,b){
    return (Math.abs(b-a)/((b+a)/2))*100;
}
function calculatePercentError(a,b){
    return (Math.abs((a-b))/b)*100;
}
function calculateStanderdDeviation(numbers, mean){ // i wrote this function a long time ago, probably will clean it up sooner than later.
    let deviation = 0;
    let at = 0;

    numbers.forEach(async number => {
        at=at+(Math.abs(Math.pow(number-mean, 2)));
    })

    deviation=Math.sqrt(at/numbers.length);

    return deviation;
}



function calculateMass(formula) {
    let input = normalizeEquation(formula);

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

function calculateInfoOnElement(element){
    const atomicNumber = Object.keys(table).findIndex(a => a == element)+1;
    const atomicWeight = table[element].mass;

    return {
        element: element,
        proton: atomicNumber,
        neutron: round(atomicWeight - atomicNumber, 0),
        electrons: atomicNumber
    }
}

function intermolecularForces(formula){
    const forces = ["LDF"];

    let input = normalizeEquation(formula);

    const containsNOF = input.map(a=> a.find(a => a == "N" || a == "O" || a == "F") !== undefined).filter(a => a == true).length !== 0; // check if equation contains NOF, used for hydrogen bonding

    const infoOfEquation = [];

    for (i = 0; i < input.length; i++) {
        const num = input[i][1] || 1;
        
        for (b = 0; b < num; b++) {
            infoOfEquation.push(calculateInfoOnElement(input[i][0]))
        }
    }

    console.log(infoOfEquation)

    const containsDoubleBond = false;

    return forces;
}

intermolecularForces(toCalculate)


console.log(round(calculateMass(toCalculate), 2))