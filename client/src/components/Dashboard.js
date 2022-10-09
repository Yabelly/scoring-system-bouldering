import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";
import Logout from "./Logout";
import { fetchGet } from "../functions/functions";
import { io } from "socket.io-client";
import {
    arrayFilled,
    pointsClassic,
    totalPoints,
} from "../functions/rankingfunctions";
// import UserRank from "./Userrank";
const socket = io();

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [processedUsers, setProcessedUsers] = useState([]);

    useEffect(() => {
        fetchGet("/api/userinfo").then((data) =>
            !data ? setError(true) : setUserInfo(data)
        );
    }, [error]);

    socket.on(`all-user-scores`, (allScores) => setAllUsers(allScores));

    useEffect(() => {
        const scoredUsers = allUsers.map((user) => {
            let scoring = user.scoring;

            const pointsPerUser = pointsClassic(scoring);

            const totalScorePerUser = totalPoints(pointsPerUser);

            return { ...user, together: totalScorePerUser };
        });
        setProcessedUsers(scoredUsers);
    }, [allUsers]);

    console.log("processedUsers: ", processedUsers);

    return (
        <>
            <div className="">
                <Logout className="bg-lime-500 h-1/6" />
                <header className="w-full h-1/6 w-full bg-red-300 flex-col ">
                    <div className="text-center text-3xl">
                        {userInfo.compname}
                    </div>
                    <div className="text-center text-5xl">
                        {userInfo.username}
                    </div>
                    {/* <UserRank></UserRank> */}
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
                                    userId={userInfo.id}
                                    userName={userInfo.username}
                                    scoring={userInfo.scoring}
                                    competition_id={userInfo.competition_id}
                                    compFormat={userInfo.compformat}
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
