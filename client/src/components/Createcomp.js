// This component creates new competitions

import { useState } from "react";
import { fetchPost } from "../functions/functions";
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
        fetchPost("/api/newcomp", { compName, boulderAmount, compFormat })
            .then((data) => {
                data.succes ? setPopUp(true) : setError(true);
            })
            .catch(setError(true));
    }

    const backToMainPage = function () {
        window.location.replace("/");
    };

    return (
        <>
            {error && (
                <div className="h-48 w-48 bg-orange-500 fixed z-20 ">
                    Something went wrong
                    <button onClick={setError(false)}>try again</button>
                </div>
            )}
            {popUp && (
                <div className="h-full w-full bg-green-500 fixed z-20 flex flex-col items-center">
                    <div className="text-2xl underline">
                        Your competition is called
                    </div>
                    <div className="text-5xl">{compName}</div>
                    <div className="text-2xl underline">the format is </div>
                    <div className="text-5xl">{compFormat}</div>
                    <div className="text-2xl underline">
                        the amount of boulders
                    </div>
                    <div className="text-5xl">{boulderAmount}</div>
                    <button onClick={() => backToMainPage()}>
                        return to mainpage
                    </button>
                </div>
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
                    <label>competition format</label>
                    <button>classic mode</button>
                    <button>Holland mode</button>
                    <label>Do you use "zone" with your boulders</label>
                    <input type="checkbox" name="zone"></input>
                    <label>Do you want to use "first ascent" mode?</label>
                    <input type="checkbox" name="firstascent"></input>

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
