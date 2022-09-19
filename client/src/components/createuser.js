import { useState, useEffect } from "react";

export default function CreateUser() {
    // This component is made to add new users to a competition.

    const [competitions, setCompetitions] = useState([]);
    const [userName, setUserName] = useState("");
    const [selectedComp, setSelectedComp] = useState("");
    const [error, setError] = useState(false);

    // !! figure out how to get the value to setSeletedComp
    console.log("selectedComp: ", selectedComp);

    // GET API to retrieve all open competitions
    useEffect(() => {
        fetch("/api/currentcomps")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setError(true);
                } else {
                    console.log("data: ", data);

                    setError(false);
                    setCompetitions(data);
                }
            });
    }, []);

    // POST API posting the new user to the database
    // !! Change this function so it adds the ID of the comp to the user
    function submitUserName(e) {
        e.preventDefault();
        fetch("/api/newuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data back from server: ", data);
            })

            .catch((err) => console.log("err: ", err));
    }

    return (
        <>
            <form className="bg-blue-200 flex flex-col justify-center items-center">
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <label>which competition are you joining?</label>
                <select>
                    {competitions.map((comp, idx) => (
                        <option
                            key={idx}
                            onChange={(e) => setSelectedComp(e.target.value)}
                        >
                            {comp.compname}
                        </option>
                    ))}
                </select>

                <button
                    onClick={(e) => {
                        submitUserName(e);
                    }}
                >
                    Register
                </button>
            </form>
        </>
    );
}
