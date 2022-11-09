import { numberTest } from "../functions/rankingfunctions";

export default function Ranking({
    scoreCardArray,
    pointsClassic,
    totalPoints,
}) {
    const userPoints = pointsClassic(scoreCardArray);
    const userScore = totalPoints(userPoints);

    //checking for an integer mistake. Something is wrong with fn totalPoints
    if (numberTest(userScore)) {
        console.log("integermistake");
    }

    return (
        <>
            <div className="text-xl underline text-white">
                POINTS: {userScore}
            </div>
            <div></div>
        </>
    );
}
