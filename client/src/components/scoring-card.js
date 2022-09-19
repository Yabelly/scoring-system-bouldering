// This component is the complete scoreform. it gets the scoring for each user and send the props to each "button" to Boulder.js

import { useState } from "react";
import SingleBoulder from "./Boulder";

export default function ScoringCard() {
    // !! replace hardcoded array with array from database
    const [boulders, setBoulders] = useState([
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: 0 },
    ]);

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
            <div className="h-96 w-96 bg-amber-400 grid grid-cols-4 gap-4">
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
