// import ScoringCard from "./components/scoring-card";
// import Userslist from "./components/userslist";

import CreateComp from "./components/Createcomp";
import CreateUser from "./components/createuser";
import Welcome from "./components/Welcome";

import { Routes, Route, Link } from "react-router-dom";

function App() {
    return (
        <div className="App  h-screen bg-gradient-to-b from-green-200 to-green-500">
            <nav className="w-full h-1/6 w-full bg-red-300 flex justify-evenly">
                <Link to="/">welcome</Link>
                <Link to="createcomp">create a competition</Link>
                <Link to="createuser">joining a competition</Link>
            </nav>
            <main className="">
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/createcomp" element={<CreateComp />} />
                    <Route path="/createuser" element={<CreateUser />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
