import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";
import Logout from "./Logout";
import { fetchGet } from "../functions/functions";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchGet("/api/userinfo").then((data) =>
            !data ? setError(true) : setUserInfo(data)
        )
        
    }, [error]);
    console.log("userInfo: ", userInfo);

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
