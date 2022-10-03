// This component is the complete scoreform. it gets the scoring for each user and send the props to each "button" to Boulder.js
import { io } from "socket.io-client";
import { useState } from "react";
import SingleBoulder from "./Boulder";
const socket = io();

export default function ScoringCard() {
    // const [error, setError] = useState(false);
    const [boulders, setBoulders] = useState([]);

    // updates the scorecard from the server and sets it to local state

    socket.on(`scorecard`, (data) => {
        setBoulders(
            data.map((score) => ({
                status: score,
            }))
        );
    });
    // function to change the status of the individual boulders and updates the database with the new array
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
        console.log("update send to server");
    }

    return (
        <>
            <div className="grid grid-cols-3 m-3">
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
