import CreateComp from "./components/Createcomp";
import CreateUser from "./components/Createuser";
import Welcome from "./components/Welcome";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";

function App() {
    return (
        <div className="App  h-screen bg-gradient-to-b from-green-200 to-green-500">
            <nav className="w-full h-1/6 w-full bg-red-300 flex flex-col justify-evenly ">
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
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/createcomp" element={<CreateComp />} />
                    <Route path="/createuser" element={<CreateUser />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
