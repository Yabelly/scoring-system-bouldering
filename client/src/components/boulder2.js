// import { useState } from "react";

export default function SingleBoulder({ boulder, id, clickHandler }) {
    return (
        <>
            <div
                onClick={() => clickHandler(id)}
                className="w-16 h-16 bg-red-500"
            >
                boulder {id}
            </div>
        </>
    );
}
