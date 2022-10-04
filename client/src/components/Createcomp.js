// This component creates new competitions

import { useState } from "react";
export default function CreateComp() {
    const [compName, setCompName] = useState("");
    const [boulderAmount, setBoulderAmount] = useState(3);
    const compFormat = "classic";
    const [popUp, setPopUp] = useState(false);
    const [error, setError] = useState(false);

    // !! replace with state when v1 is done: so i can add different formats for competing
    // const [compFormat, setCompFormat] = useState("classic");

    // POST API adding new competition
    function submitComp(e) {
        e.preventDefault();
        console.log(
            "compName, boulderAmount, compFormat: ",
            compName,
            boulderAmount,
            compFormat
        );

        fetch("/api/newcomp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ compName, boulderAmount, compFormat }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data back from server: ", data);
                return data.succes ? setPopUp(true) : setError(true);
            })

            .catch((err) => console.log("err: ", err));
    }

    return (
        <>
            {error && (
                <div className="h-48 w-48 bg-orange-500 fixed z-20 ">
                    Something went wrong
                    <button onClick={setError(false)}>try again</button>
                </div>
            )}
            {popUp && (
                <div className="h-48 w-48 bg-green-500 fixed z-20 ">test</div>
            )}
            {!popUp && !error && (
                <form className="bg-blue-400 flex flex-col justify-center items-center">
                    <label>name of the competition:</label>
                    <input
                        name="compname"
                        type="text"
                        placeholder={compName}
                        onChange={(e) => setCompName(e.target.value)}
                    ></input>
                    <label>amount of qualification boulders (3-100)</label>
                    <input
                        type="number"
                        name="bouldersamount"
                        min="3"
                        max="100"
                        onChange={(e) => setBoulderAmount(e.target.value)}
                    ></input>

                    <button
                        onClick={(e) => {
                            submitComp(e);
                        }}
                    >
                        create competition
                    </button>
                </form>
            )}
        </>
    );
}
