// This component is the complete scoreform. it gets the scoring for each user and send the props to each "button" to Boulder.js
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import SingleBoulder from "./Boulder";
const socket = io();

export default function ScoringCard() {
    // const [error, setError] = useState(false);
    const [boulders, setBoulders] = useState([]);

    // initial request to get the scoring from the server
    useEffect(() => {
        console.log("updated from server");

        socket.on(`scorecard`, (data) => {
            setBoulders(
                data.map((score) => ({
                    status: score,
                }))
            );
        });
    }, [boulders]);

    // function to change the status of the individual boulders.
    function clickHandler(id) {
        boulders[id].status++;
        if (boulders[id].status > 2) {
            boulders[id].status = 0;
        }
        setBoulders([...boulders]);
        socket.emit(
            `update`,
            boulders.map((boulder) => boulder.status)
        );
        console.log("updated send");
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
