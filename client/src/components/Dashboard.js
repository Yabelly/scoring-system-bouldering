import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";
import { io } from "socket.io-client";
const socket = io();

export default function Dashboard() {
    socket.on("new-user", (data) => {
        console.log("new-user DATA: ", data);
        socket.emit(`thanks`, {
            info: [`eat a bag of carrots server`],
            
        });
    });

    return (
        <>
            <nav className="w-full h-1/6 w-full bg-red-300 flex justify-evenly">
                <Link to="/">scorecard</Link>
                <Link to="userslist">standings</Link>
            </nav>
            <main>
                <Routes>
                    <Route path="/userslist" element={<Userslist />} />
                </Routes>
                <Routes>
                    <Route path="/" element={<ScoringCard />} />
                </Routes>
            </main>
        </>
    );
}
