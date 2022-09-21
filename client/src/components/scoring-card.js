// This component is the complete scoreform. it gets the scoring for each user and send the props to each "button" to Boulder.js
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SingleBoulder from "./Boulder";

export default function ScoringCard() {
    const [error, setError] = useState(false);
    const [boulders, setBoulders] = useState([]);
    const socket = io();

    socket.on(`scorecard`, (data) => {
        console.log("data scorecard: ", data)
        
    });

    useEffect(() => {
        fetch("/api/userinfo")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setError(true);
                    console.log("error: ", error);
                } else {
                    setError(false);

                    var returnArray = data.scoring.map((score) => ({
                        status: score,
                    }));

                    setBoulders(returnArray);
                }
            });
        return;
    }, [error]);

    // function to change the status of the individual boulders.
    function clickHandler(id) {
        boulders[id].status++;
        if (boulders[id].status > 2) {
            boulders[id].status = 0;
        }
        setBoulders([...boulders]);
    }

    return (
        <>
            <div className="bg-amber-400 grid grid-cols-4 gap-2">
                {boulders.map((boulder, idx) => (
                    <SingleBoulder
                        boulder={boulder}
                        id={idx}
                        clickHandler={clickHandler}
                        key={idx}
                    ></SingleBoulder>
                ))}
            </div>
        </>
    );
}
