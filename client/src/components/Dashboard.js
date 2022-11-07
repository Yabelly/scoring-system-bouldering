import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";
import Logout from "./Logout";
import UserRank from "./Userrank";
import { fetchGet } from "../functions/functions";

import { pointsClassic, totalPoints } from "../functions/rankingfunctions";
import Scorecard from "./Scorecard";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [scoreCardArray, setScoreCardArray] = useState([]);

    useEffect(() => {
        let active = true;
        fetchGet("/api/alldata").then((data) => {
            setUserInfo(data.userObject);
            setAllUsers(data.compDataArray);
            setScoreCardArray(data.userObject.scoring);
            console.log("useEffect ran");
        });
        return () => (active = false);
    }, []);

    const scoredUsers = allUsers.map((user) => {
        const pointsPerUser = pointsClassic(user.scoring);
        const totalScorePerUser = totalPoints(pointsPerUser);

        return { ...user, summedScore: totalScorePerUser };
    });

    const rankedUsers = scoredUsers.sort((a, b) => {
        return b.summedScore - a.summedScore;
    });

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
                                <UserRank
                                    rankedUsers={rankedUsers}
                                    userId={userInfo.id}
                                ></UserRank>
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
                                        rankedUsers={rankedUsers}
                                        userId={userInfo.id}
                                    />
                                }
                            />

                            <Route
                                path="/"
                                element={
                                    <Scorecard
                                        setScoreCardArray={setScoreCardArray}
                                        scoreCardArray={scoreCardArray}
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
