import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";

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
            <nav className="w-full h-1/6 w-full bg-red-300 flex justify-evenly">
                <Link to="/">scorecard</Link>
                <Link to="/userslist">standings</Link>
            </nav>
            <main>
                <div>username: {userInfo.username}</div>
                <div>competition ID: {userInfo.competition_id}</div>

                <Routes>
                    <Route path="/userslist" element={<Userslist />} />
                    <Route path="/" element={<ScoringCard />} />
                </Routes>
            </main>
        </>
    );
}
