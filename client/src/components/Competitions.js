import { useEffect, useState } from "react";
import { fetchGet } from "../functions/functions";

export default function Competitions() {
    const [competitions, setCompetitions] = useState([]);
    const [chosenCompetitionId, setChosenCompetitionId] = useState("");

    useEffect(() => {
        fetchGet(`/api/currentcomps`).then((data) => setCompetitions(data));
    }, []);

    console.log("competitions: ", competitions);
    console.log("chosenCompetitionId: ", chosenCompetitionId);

    return (
        <>
          
            <div className="text-5xl">current competitions</div>
            <div className="grid grid-cols-3">
                {competitions.map((comp, idx) => (
                    <div
                        onClick={() => setChosenCompetitionId(comp.id)}
                        key={idx}
                    >
                        <div>{comp.compname}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
