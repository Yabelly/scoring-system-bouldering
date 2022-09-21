import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";
import Userslist from "./Userslist";

export default function Dashboard() {
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
