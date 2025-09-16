
function baseToBigInt(str, base) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    base = Number(base);
    str = str.toLowerCase();
    let result = 0n;
    for (let ch of str) {
        const digit = BigInt(chars.indexOf(ch));
        if (digit >= BigInt(base)) {
            throw new Error(`Invalid digit ${ch} for base ${base}`);
        }
        result = result * BigInt(base) + digit;
    }
    return result;
}

function findConstantTerm(points) {
    const k = points.length;
    let c = 0n;

    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        xi = BigInt(xi);
        yi = BigInt(yi);
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = BigInt(points[j][0]);
                term = term * (-xj) / (xi - xj);
            }
        }
        c += term;
    }
    return c;
}


function computeCValue(data) {
    const k = data.keys.k;
    const points = [];

    for (let i = 1; i <= k; i++) {
        const base = data[i].base;
        const value = data[i].value;
        const decimal = baseToBigInt(value, base);
        points.push([i, decimal]);
    }

    const cValue = findConstantTerm(points);
    return cValue;
}

const data1 = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

console.log("Test Case 1 - c =", computeCValue(data1).toString());

const data2 = {
  "keys": { "n": 10, "k": 7 },
  "1": { "base": "6", "value": "13444211440455345511" },
  "2": { "base": "15", "value": "aed7015a346d635" },
  "3": { "base": "15", "value": "6aeeb69631c227c" },
  "4": { "base": "16", "value": "e1b5e05623d881f" },
  "5": { "base": "8", "value": "316034514573652620673" },
  "6": { "base": "3", "value": "2122212201122002221120200210011020220200" },
  "7": { "base": "3", "value": "20120221122211000100210021102001201112121" },
  "8": { "base": "6", "value": "20220554335330240002224253" },
  "9": { "base": "12", "value": "45153788322a1255483" },
  "10": { "base": "7", "value": "1101613130313526312514143" }
};

console.log("Test Case 2 - c =", computeCValue(data2).toString());
