function range(start, end, step=1) {
    let arr = [];
    let comparison;

    for (let i = start; determineCondition(i, end, step); i = i + step) {
        arr.push(i);
    };
    return arr;
}

function determineCondition(start, end, step) {
    if (Math.sign(step) === 1) {
        return start <= end;
    } else {
        return start >= end;
    }
}

function sum(range) {
    let sum = 0

    for (i of range) {
        sum += i
    }

    return sum;
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55