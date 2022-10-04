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

    // console.log("allCompetitors: ", allCompetitors);

    // function addTotalScoreForEach(allCompetitors, scoringArray) {
    //     for (let i = 0; i <= allCompetitors.length; i++) {
    //         const initialValue = 0;
    //         const sumOfArray = scoringArray.reduce((accumulator, value) => {
    //             return accumulator + value;
    //         }, initialValue);
    //         console.log("sumOfArray: ", sumOfArray);

    //     }
    // }

    // addTotalScoreForEach(allCompetitors, allCompetitors.scoring);

    // i got all users array: allCompetitors
    // i got scoring array: allCompetitors[i].scoring

    // I need to first make a function that gives me total soore of an array
    // i need the results of that function to give each competitor a ranking
    // i need to use this ranking to map the users

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
