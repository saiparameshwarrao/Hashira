function findCValue(data) {
    const k = data.keys.k;

    function toDecimal(value, base) {
        return parseInt(value, base);
    }

    const points = [];
    for (let i = 1; i <= k; i++) {
        points.push([i, toDecimal(data[i].value, parseInt(data[i].base))]);
    }

    console.log(points)

    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    const [x3, y3] = points[2];


    const a = ((y3 - y2) - (y2 - y1)) / ((x3*x3 - x2*x2) - (x2*x2 - x1*x1));
    const b = (y2 - y1 - a*(x2*x2 - x1*x1)) / (x2 - x1);
    const c = y1 - a*x1*x1 - b*x1;

    return c;
}

const data = {
    "keys": { "n": 4, "k": 3 },
    "1": { "base": "10", "value": "4" },
    "2": { "base": "2", "value": "111" },
    "3": { "base": "10", "value": "12" },
    "6": { "base": "4", "value": "213" }
};

console.log("c value =", findCValue(data));
