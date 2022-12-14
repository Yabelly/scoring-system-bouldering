import CreateComp from "./components/Createcomp";
import CreateUser from "./components/Createuser";
import Welcome from "./components/Welcome";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Competitions from "./components/Competitions";

function App() {
    return (
        <div className="App  h-screen bg-[#032B43]">
            {/* <nav className="w-full h-1/6 w-full bg-red-300 flex flex-col justify-evenly ">
                <Link className="text-xl underline" to="/">
                    welcome
                </Link>
                <Link className="text-xl underline" to="createcomp">
                    create a competition
                </Link>
                <Link className="text-xl underline" to="createuser">
                    joining a competition
                </Link>
                <Link className="text-xl underline" to="login">
                    login
                </Link>
                <Link className="text-xl underline" to="competitions">
                    competitions
                </Link>
            </nav> */}
            <main>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/competitions" element={<Competitions />} />
                    <Route path="/createcomp" element={<CreateComp />} />
                    <Route path="/createuser" element={<CreateUser />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
