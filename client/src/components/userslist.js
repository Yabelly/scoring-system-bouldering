// This component shows the full list of competitors and their scoring
import { useQuery } from "@tanstack/react-query";
import { fetchGet } from "../functions/functions";
import { useState } from "react";

export default function Userslist({ userId, compId }) {
    const [otherCompetitor, setOtherCompetitor] = useState(false);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["competitors"],
        queryFn: () => fetchGet(`/api/getallusers/${compId}`),
    });

    if (isLoading) {
        return <span className="bg-white">Loading...</span>;
    }

    if (isError) {
        return <span className="bg-white">Error: {error.message}</span>;
    }

    const otherScorecard = function (user) {
        setOtherCompetitor(user);
    };

    console.log("otherCompetitor: ", otherCompetitor);

    return (
        <>
            <div className=" bg-[#136F63] rounded-lg">
                <div className="flex place-content-evenly ">
                    <div className="text-3xl">Rank</div>
                    <div className="text-3xl">username</div>
                    <div className="text-3xl">total score</div>
                </div>
                {data.map((competitor, idx) => (
                    <div
                        // onClick={() => otherScorecard(competitor)}
                        key={idx}
                        className={`grid
                         grid-cols-3 bg-[#FFBA08] ${
                             userId === competitor.id &&
                             `font-bold bg-[#fc7703]`
                         } rounded-full mx-2 px-1 mt-1.5`}
                    >
                        <div className="text-2xl"> {idx + 1}</div>
                        <div className="text-2xl"> {competitor.username}</div>
                        <div className="text-2xl">
                            {competitor.total_points}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
