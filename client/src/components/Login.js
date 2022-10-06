import { useState, useEffect } from "react";

export default function Login() {
    const [competitions, setCompetitions] = useState([]);
    const [error, setError] = useState(false);
    const [chosenCompetitionId, setChosenCompetitionId] = useState("");
    const [userName, setUserName] = useState("");
    const [pinCode, setPinCode] = useState(``);

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

        if (userName.match(userNameRegex) && pinCode.length === 4) {
            fetch("/api/userlogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    chosenCompetitionId,
                    pinCode,
                }),
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

    return (
        <>
            <div className="bg-red-400 flex flex-col justify-center items-center">
                <p>choose your competition</p>
                <div className="grid grid-cols-3  bg-green-300">
                    {competitions.map((comp) => (
                        <button
                            className="border-solid border-2 border-black m-2.5  hover:bg-green-600 active:bg-violet-700 "
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
                <p className="underline"> enter your 4 digit pincode</p>
                <input
                    name="pincode"
                    type="number"
                    placeholder="pincode here"
                    onChange={(e) => setPinCode(e.target.value)}
                ></input>

                <button
                    onClick={(e) => {
                        submitUserName(e);
                    }}
                >
                    login
                </button>
            </div>
        </>
    );
}
