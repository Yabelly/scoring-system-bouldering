// import ScoringCard from "./components/scoring-card";
import CreateComp from "./components/Createcomp";
import CreateUser from "./components/createuser";
// import Userslist from "./components/userslist";

import { Route, Routes, Link } from "react-router-dom";

function App() {
    return (
        <div className="App">
            {/* continue this routing stuff */}
            <Routes>
                <Link to="/createcomp">create competition</Link>
                <Link to="/joincomp">create competition</Link>
                <Route path="/"></Route>
                <Route
                    path="/createcomp"
                    element={<CreateComp></CreateComp>}
                ></Route>
                <Route
                    path="/joincomp"
                    element={<CreateUser></CreateUser>}
                ></Route>
            </Routes>
            {/* <CreateComp></CreateComp> */}
            {/* <CreateUser></CreateUser>
            <Userslist></Userslist> */}
            {/* <ScoringCard></ScoringCard> */}
        </div>
    );
}

export default App;
