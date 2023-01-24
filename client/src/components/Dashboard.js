import { Routes, Route, Link } from "react-router-dom";
import Userslist from "./Userslist";
import Logout from "./Logout";
import { fetchGet } from "../functions/functions";
import Ranking from "./Ranking";
import Scorecard from "./Scorecard";
import { useQuery } from "@tanstack/react-query";
import Unlock from "./testComponenets/Unlock";
import { useState } from "react";

export default function Dashboard() {
    const [locked, setLocked] = useState(true);
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["userinfo"],
        queryFn: () => fetchGet("/api/userinfo"),
    });

    if (isLoading) {
        return <span className="bg-white">Loading...</span>;
    }

    if (isError) {
        return <span className="bg-white">Error: {error.message}</span>;
    }

    return (
        <>
            {locked && <Unlock className="z-10 absolute "
            setLocked={setLocked}
            ></Unlock>}
            <div className="bg-[#032B43] ">
                <div className="bg-[#032B43] m-3">
                    <header className="w-full h-1/6 w-full   flex-col">
                        <div className="flex justify-between">
                            <div className="text-center text-3xl underline text-white">
                                {data.compname}
                            </div>
                            <Logout />
                        </div>
                        <div className="flex flex-row place-content-evenly ">
                            <div className="text-center text-5xl underline text-white ">
                                {data.username}
                            </div>
                            <Link to="/userslist">
                                <Ranking userName={data.username} />
                            </Link>
                        </div>
                    </header>
                    <nav></nav>
                    <main>
                        <Routes>
                            <Route
                                path="/userslist"
                                element={
                                    <Userslist
                                        userId={data.id}
                                        compId={data.competition_id}
                                    />
                                }
                            />
                            <Route path="/" element={<Scorecard />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </>
    );

    //     return (
    //         <>
    //             <div className="bg-[#032B43] ">
    //                 <div className="bg-[#032B43] m-3">
    //                     <header className="w-full h-1/6 w-full   flex-col">
    //                         <div className="flex justify-between">
    //                             <div className="text-center text-3xl underline text-white">
    //                                 {userInfo.compname}
    //                             </div>
    //                             <Logout />
    //                         </div>

    //                         <div className="flex flex-row place-content-evenly ">
    //                             <div className="text-center text-5xl underline text-white ">
    //                                 {userInfo.username}
    //                             </div>
    //                             <Link to="/userslist">
    //                                 <Ranking
    //                                     userScore={userScore}
    //                                     userRank={userRank}
    //                                 />
    //                             </Link>
    //                         </div>
    //                     </header>
    //                     <nav className="w-full h-1/6 w-full  flex justify-around">
    //                         <Link
    //                             className=" bg-[#D00000] rounded-full p-1.5 text-white m-2.5 text-3xl"
    //                             to="/"
    //                         >
    //                             scorecard
    //                         </Link>
    //                     </nav>

    //                     <main>
    //                         <Routes>
    //                             <Route
    //                                 path="/userslist"
    //                                 element={
    //                                     <Userslist
    //                                         userId={userInfo.id}
    //                                         rankedUsers={rankedUsers}
    //                                     />
    //                                 }
    //                             />

    //                             <Route
    //                                 path="/"
    //                                 element={
    //                                     <Scorecard
    //                                         setScoreCardArray={setScoreCardArray}
    //                                         scoreCardArray={scoreCardArray}
    //                                         id={userInfo.id}
    //                                         error={error}
    //                                         setError={setError}
    //                                     />
    //                                 }
    //                             />
    //                         </Routes>
    //                     </main>
    //                 </div>
    //             </div>
    //         </>
    //     );
}
