import { useState } from "react";
// import Boulder from "./boulder";
import SingleBoulder from "./boulder2";

export default function ScoringCard() {
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

    function clickHandler(id) {
        if (boulders.status === 0) {
            setBoulders.status(1);
        }
        console.log("boulders: ", boulders);
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
