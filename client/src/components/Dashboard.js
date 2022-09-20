import { Routes, Route, Link } from "react-router-dom";
import ScoringCard from "./Scoring-card";


export default function Dashboard() {
    return (
        <>
            <nav className="w-full h-1/6 w-full bg-red-300 flex justify-evenly">
                <Link to="/"></Link>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<ScoringCard />} />
                </Routes>
            </main>
        </>
    );
}
