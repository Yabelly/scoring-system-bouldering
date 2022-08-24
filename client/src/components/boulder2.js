// import { useState } from "react";

export default function SingleBoulder({ boulder, id, clickHandler }) {
    console.log("boulder: ", boulder);
    let boulderStatus = "";

    if (boulder.status === 0) {
        boulderStatus = "bg-red-700";
    } else if (boulder.status === 1) {
        boulderStatus = "bg-lime-400";
    } else if (boulder.status === 2) {
        boulderStatus = "bg-sky-500";
    }

    return (
        <>
            <div
                onClick={() => clickHandler(id)}
                className={`w-16 h-16 ${boulderStatus}`}
            >
                boulder {id}
            </div>
        </>
    );
}
