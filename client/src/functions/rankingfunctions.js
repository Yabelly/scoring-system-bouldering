// function that logs if an array is filled

export function arrayFilled(arr) {
    return arr.length ? true : false;
}

//function that returns if obj is emty
export function isObjectEmty(obj) {
    return Object.keys(obj).length === 0;
}

// function to give points to boulder in classic mode
export function pointsClassic(arr) {
    const a = [...arr];
    let scoreSingleBoulder = a.map((item) => {
        if (item === 0) return item; // no score for boulder => 0 points
        else if (item === 1) {
            // boulder is topped => 2 points
            return (item = 2);
        } else if (item === 2) {
            //boulder is flashed => 3 points
            return (item = 3);
        }
        return item;
    });
    return [...scoreSingleBoulder];
}

// function reduce all the points to a total score
export function totalPoints(arr) {
    const a = [...arr];
    const total = a.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
    );

    return total;
}

export const numberTest = (n) => {
    const result = n - Math.floor(n) !== 0;
    return result;
};
