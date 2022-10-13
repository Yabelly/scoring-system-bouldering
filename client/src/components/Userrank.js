import { useEffect, useState } from "react";
import { arrayFilled } from "../functions/rankingfunctions";

export default function UserRank({ userId, rankedUsers }) {
    const [rank, setRank] = useState(0);
    const [userPoints, setUserPoints] = useState([]);

    useEffect(() => {
        setRank(rankedUsers.map((obj) => obj.id).indexOf(userId) + 1);
        setUserPoints(rankedUsers.filter((obj) => obj.id === userId));
    }, [userId, rankedUsers]);

    return (
        <>
            {arrayFilled(userPoints) && rank !== 0 && (
                <div>
                    <div className="text-xl underline text-white">
                        rank: {rank}
                    </div>
                    <div className="text-xl underline text-white">
                        points: {userPoints[0].summedScore}
                    </div>
                </div>
            )}
        </>
    );
}
