// This component shows the full list of competitors and their scoring
import { useState, useEffect } from "react";

export default function Userslist() {
    const [allCompetitors, setAllCompetitors] = useState([]);
    const [error, setError] = useState(false);

    // GET API for retrieving all competitors of the competition.
    useEffect(() => {
        fetch("/api/getallusers")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setError(true);
                } else {
                    setError(false);
                    setAllCompetitors(data);
                }
            });
    }, []);
    console.log("allCompetitors: ", allCompetitors);

    return (
        <>
            <div>
                {allCompetitors.map((competitor, idx) => (
                    <div key={idx}>
                        {competitor.username}
                        {competitor.scoring}
                    </div>
                ))}
            </div>
        </>
    );
}
