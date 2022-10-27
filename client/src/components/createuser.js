// This component is made to add new users to a competition.
import { fetchGet, fetchPost } from "../functions/functions";
import { useState, useEffect } from "react";

export default function CreateUser() {
    const [competitions, setCompetitions] = useState([]);
    const [error, setError] = useState(false);
    const [userName, setUserName] = useState("");
    const [chosenCompetitionId, setChosenCompetitionId] = useState("");
    const [pinOne, setPinOne] = useState(``);
    const [pinTwo, setPinTwo] = useState(``);

    // GET API to retrieve all competitions
    useEffect(() => {
        fetchGet("/api/currentcomps").then((data) => {
            console.log("data: ", data);
            data ? setCompetitions(data) : setError(true);
        });
        console.log("running again");
    }, []);

    function submitUserName(e) {
        e.preventDefault();

        // regex to check if userName has only letters and numbers
        const userNameRegex = /^[a-zA-Z0-9]+$/;

        // check if pin is the same and if string constrains are met
        if (
            userName.match(userNameRegex) &&
            pinOne === pinTwo &&
            pinOne.length === 4
        ) {
            fetchPost("/api/newuser", {
                userName,
                chosenCompetitionId,
                pinOne,
            }).then((data) =>
                data ? window.location.replace("/") : setError(true)
            );
        } else {
            setError(true);
        }
    }

    return (
        <>
            <div className="bg-[#032B43]flex flex-col text-center">
                <p className="text-5xl text-white">CHOOSE YOUR COMPETITION</p>
                {error && (
                    <div className="h-48 w-48 bg-orange-500 fixed z-20 ">
                        Something went wrong
                        <button onClick={setError(false)}>try again</button>
                    </div>
                )}
                <br></br>

                <div className="grid grid-cols-1 bg-[#FFBA08] rounded-lg">
                    {competitions.map((comp) => (
                        <button
                            className="text-3xl rounded-full m-2.5 bg-[#3F88C5] hover:bg-[#D00000] active:bg-[#D00000] hover:text-white
                             "
                            key={comp.id}
                            onClick={() => setChosenCompetitionId(comp.id)}
                        >
                            {comp.compname}
                        </button>
                    ))}
                </div>
                <br></br>
                <p className="underline text-3xl text-white">
                    ENTER YOUR USERNAME
                </p>
                <p className=" text-2xl text-white">only letters & numbers</p>
                <input
                    className="text-3xl"
                    name="username"
                    type="text"
                    placeholder="username here"
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <p className="underline text-3xl text-white ">
                    ENTER 4 DIGIT PINCODE
                </p>
                <input
                    className="text-3xl"
                    name="pincode"
                    type="number"
                    placeholder="pincode here"
                    onChange={(e) => setPinOne(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <p className="underline text-3xl text-white">CONFIRM PINCODE</p>
                <input
                    className="text-3xl"
                    name="pincoderepeat"
                    type="number"
                    placeholder="pincode here"
                    onChange={(e) => setPinTwo(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <button
                    className="text-5xl text-white bg-[#D00000] rounded-full m-2.5 text-white px-1.5"
                    onClick={(e) => {
                        submitUserName(e);
                    }}
                >
                    JOIN COMP
                </button>
            </div>
        </>
    );
}
