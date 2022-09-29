// This component is made to add new users to a competition.

import { useState, useEffect } from "react";

export default function CreateUser() {
    const [competitions, setCompetitions] = useState([]);
    const [error, setError] = useState(false);
    const [userName, SetUserName] = useState("");
    const [chosenCompetitionId, setChosenCompetitionId] = useState("");

    // GET API to retrieve all open competitions
    useEffect(() => {
        fetch("/api/currentcomps")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setError(true);
                    console.log("error: ", error);
                } else {
                    setError(false);
                    setCompetitions(data);
                }
            });
    }, [error]);
// add password to this component   
    // POST API posting the new user to the database
    function submitUserName(e) {
        e.preventDefault();
        fetch("/api/newuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName, chosenCompetitionId }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data: ", data);

                if (data.success === true) {
                    console.log("window.location: ", window.location);

                    window.location.replace("/");
                } else {
                    console.log("something went wrong with API /newuser");
                }
            })

            .catch((err) => console.log("err: ", err));
    }

    return (
        <>
            <div className="bg-red-400 flex flex-col justify-center items-center">
                <p>choose you competition</p>
                <div className="grid grid-cols-3  bg-green-300">
                    {competitions.map((comp) => (
                        <button
                            className="border-solid border-2 border-black m-2.5 "
                            key={comp.id}
                            onClick={() => setChosenCompetitionId(comp.id)}
                        >
                            {comp.compname}
                        </button>
                    ))}
                </div>
                <p className="underline">enter your username</p>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => SetUserName(e.target.value)}
                ></input>

                <button
                    onClick={(e) => {
                        submitUserName(e);
                    }}
                >
                    Register
                </button>
            </div>
        </>
    );
}
