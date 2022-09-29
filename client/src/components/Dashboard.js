import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";
import Logout from "./Logout";

export default function Dashboard() {
    const [userInfo, setUserInfo] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/userinfo")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setError(true);
                    console.log("error: ", error);
                } else {
                    setError(false);
                    setUserInfo(data);
                }
            });
    }, [error]);

    return (
        <>
            <div className="bg-black">
                {/* <Logout className="bg-white h-1/6" />  */}
                <header className="w-full h-1/6 w-full bg-red-300 flex-col ">
                    <div className="text-center text-5xl">
                        {userInfo.username}
                    </div>
                    <div className="text-center text-3xl">
                        competition ID: {userInfo.competition_id}
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
                        <Route path="/userslist" element={<Userslist />} />
                        <Route path="/" element={<ScoringCard />} />
                    </Routes>
                </main>
            </div>
        </>
    );
}
