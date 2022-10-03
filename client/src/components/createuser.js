// This component is made to add new users to a competition.

import { useState, useEffect } from "react";

export default function CreateUser() {
    const [competitions, setCompetitions] = useState([]);
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState("");
    const [chosenCompetitionId, setChosenCompetitionId] = useState("");
    const [pinOne, setPinOne] = useState(``);
    const [pinTwo, setPinTwo] = useState(``);
    console.log("pinOne: ", pinOne);

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

    function submitUserName(e) {
        e.preventDefault();

        // regex to check if userName has only letters and numbers
        const userNameRegex = /^[a-zA-Z0-9]+$/;

        if (
            userName.match(userNameRegex) &&
            pinOne === pinTwo &&
            pinOne.length === 4
        ) {
            fetch("/api/newuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userName, chosenCompetitionId, pinOne }),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("data: ", data);

                    if (data.success === true) {
                        window.location.replace("/");
                    } else {
                        console.log("something went wrong with API /newuser");
                    }
                })

                .catch((err) => console.log("err: ", err));
        } else {
            setError(true);
        }
    }

    // Pseudocode:
    // check if database has name already
    // bcrypt en add to database
    // send back succes Object

    // pin psuedo:
    // usestate for pin1 and pin2
    // onclick check if p1 and p2 are same AND if they contain 4 digits

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
                    placeholder="username here"
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <br></br>
                <p className="underline"> enter a 4 digit pincode (0-9)</p>
                <input
                    name="pincode"
                    type="number"
                    placeholder="pincode here"
                    onChange={(e) => setPinOne(e.target.value)}
                ></input>
                <p className="underline">confirm pincode</p>
                <input
                    name="pincoderepeat"
                    type="number"
                    placeholder="pincode here"
                    onChange={(e) => setPinTwo(e.target.value)}
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
