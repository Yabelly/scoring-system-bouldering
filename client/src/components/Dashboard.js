import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Userslist from "./Userslist";
import Logout from "./Logout";
import { fetchGet } from "../functions/functions";
import Ranking from "./Ranking";

import {
    pointsClassic,
    totalPoints,
    arrayFilled,
} from "../functions/rankingfunctions";
import Scorecard from "./Scorecard";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [scoreCardArray, setScoreCardArray] = useState([]);
    const [rankedUsers, setRankedUsers] = useState([]);
    const [error, setError] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [userRank, setUserRank] = useState(0);

    useEffect(() => {
        let active = true;
        fetchGet("/api/alldata").then((data) => {
            setUserInfo(data.userObject);
            if (!arrayFilled(scoreCardArray)) {
                setScoreCardArray(data.userObject.scoring);
            }

            const scoredUsers = data.compDataArray.map((user) => {
                const pointsPerUser = pointsClassic(user.scoring);
                const totalScorePerUser = totalPoints(pointsPerUser);

                return { ...user, summedScore: totalScorePerUser };
            });
            const totalRankings = scoredUsers.sort((a, b) => {
                return b.summedScore - a.summedScore;
            });
            setRankedUsers(totalRankings);

            const userObject = rankedUsers.filter(
                (user) => user.id === userInfo.id
            );
            setUserScore(userObject[0].summedScore);

            setUserRank(
                rankedUsers.findIndex((user) => user.id === userInfo.id) + 1
            );
        });
        console.log("running");

        return () => (active = false);
    }, [JSON.stringify(scoreCardArray)]); // how to have a dependency that doesn't wreck my rendering?

    return (
        <>
            <div className="bg-[#032B43] ">
                <div className="bg-[#032B43] m-3">
                    <header className="w-full h-1/6 w-full   flex-col">
                        <div className="flex justify-between">
                            <div className="text-center text-3xl underline text-white">
                                {userInfo.compname}
                            </div>
                            <Logout />
                        </div>

                        <div className="flex flex-row place-content-evenly ">
                            <div className="text-center text-5xl underline text-white ">
                                {userInfo.username}
                            </div>
                            <Link to="/userslist">
                                <Ranking
                                    userScore={userScore}
                                    userRank={userRank}
                                />
                            </Link>
                        </div>
                    </header>
                    <nav className="w-full h-1/6 w-full  flex justify-around">
                        <Link
                            className=" bg-[#D00000] rounded-full p-1.5 text-white m-2.5 text-3xl"
                            to="/"
                        >
                            scorecard
                        </Link>
                    </nav>

                    <main>
                        <Routes>
                            <Route
                                path="/userslist"
                                element={
                                    <Userslist
                                        userId={userInfo.id}
                                        rankedUsers={rankedUsers}
                                    />
                                }
                            />

                            <Route
                                path="/"
                                element={
                                    <Scorecard
                                        setScoreCardArray={setScoreCardArray}
                                        scoreCardArray={scoreCardArray}
                                        id={userInfo.id}
                                        error={error}
                                        setError={setError}
                                    />
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </div>
        </>
    );
}
