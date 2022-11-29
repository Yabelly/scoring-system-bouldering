import { useEffect } from "react";

export default function Ranking({ userScore, userRank }) {
    return (
        <>
            <div className="text-xl underline text-white">
                POINTS: {userScore}
            </div>
            <div className="text-xl underline text-white">RANK: {userRank}</div>
        </>
    );
}
