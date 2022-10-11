import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";
import Logout from "./Logout";
import UserRank from "./Userrank";
import { fetchGet } from "../functions/functions";

import { pointsClassic, totalPoints } from "../functions/rankingfunctions";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetchGet("/api/alldata").then((data) => {
            setUserInfo(data.userObject);
            setAllUsers(data.compDataArray);
        });
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
            <div className="">
                <Logout className="bg-lime-500 h-1/6" />
                <header className="w-full h-1/6 w-full bg-red-300 flex-col ">
                    <div className="text-center text-3xl">
                        {userInfo.compname}
                    </div>
                    <div className="flex flex-row place-content-evenly ">
                        <div className="text-center text-5xl">
                            {userInfo.username}
                        </div>
                        <UserRank
                            rankedUsers={rankedUsers}
                            userId={userInfo.id}
                        ></UserRank>
                    </div>
                </header>
                <nav className="w-full h-1/6 w-full bg-green-300 flex justify-evenly">
                    <Link
                        className="border-solid border-2 border-black m-2.5 text-4xl"
                        to="/"
                    >
                        scorecard
                    </Link>
                    <Link
                        className="border-solid border-2 border-black m-2.5 text-4xl "
                        to="/userslist"
                    >
                        standings
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
                        <Route path="/" element={<ScoringCard />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}
