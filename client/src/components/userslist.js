// This component shows the full list of competitors and their scoring
import { useState, useEffect } from "react";

export default function Userslist(props) {
    const [allCompetitors, setAllCompetitors] = useState([]);
    const [error, setError] = useState(false);
    const { userId, userName, scoring, competition_id } = props;

    // GET API for retrieving all competitor data of that competition.
    useEffect(() => {
        fetch(`/api/getallusers/${competition_id}`)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setError(true);
                } else {
                    setError(false);
                    setAllCompetitors(data);
                }
            });
    }, [competition_id]);

    console.log("allCompetitors: ", allCompetitors);

    if (allCompetitors) {
        allCompetitors.map((competitor) => {
            let competitorScoring = competitor.scoring.reduce(
                (accumulator, value) => {
                    return accumulator + value;
                },
                0
            );
            console.log(
                "competitorScoring: ",
                competitor.username,
                competitorScoring
            );
        });
    }

    // function totalPoints(arr){
    //     let total = arr.reduce((accumulator, value) => {
    //         return accumulator + value;
    //     }, 0);
    // }


    // !! rework this so results are represented and standings
    return (
        <>
            <div className="bg-red-200 h-full w-full">
                {allCompetitors.map((competitor, idx) => (
                    <div key={idx}>{competitor.username}</div>
                ))}
            </div>
        </>
    );
}
