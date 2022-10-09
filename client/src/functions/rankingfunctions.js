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
    let scoreSingleBoulder = arr.map((item) => {
        if (item === 0) return item; // no score for boulder => 0 points
        if (item === 1) {
            // boulder is topped => 2 points
            return (item = 2);
        } else if (item === 2) {
            //boulder is flashed => 2.4 points
            return (item = 2.4);
        }
        return item;
    });
    return scoreSingleBoulder;
}

// function reduce all the points to a total score
export function totalPoints(arr) {
    const initialValue = 0;
    const sumWithInitial = arr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue
    );
    return sumWithInitial;
}

// export function totalScoring(allUsersArray) {
//     const dataArrived = arrayFilled(allUsersArray);
//     if (!dataArrived) {
//         console.log("no data just yet");
//         return;
//     } else {
//         allUsersArray.map((scoringArrayPerUser) => {
//             const pointsPerUser = pointsClassic(scoringArrayPerUser);
//             const totalScorePerUser = totalPoints(pointsPerUser);
//             return totalScorePerUser;
//         });
//     }
// }
