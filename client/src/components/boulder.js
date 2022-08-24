import { useState } from "react";

export default function Boulder() {
    // bouderstatus 0: no send at all
    // bouldeerstatus 1: send in first try
    // boulderstatus 2: send more then 1 try
    const [boulderStatus, setBoulderStatus] = useState(0);

    function clicker() {
        if (boulderStatus === 0) {
            setBoulderStatus(1);
        } else if (boulderStatus === 1) {
            setBoulderStatus(2  );
        } else if (boulderStatus === 2) {
            setBoulderStatus(0);
        }
    }

    if (boulderStatus === 0) {
        return (
            <>
                <div onClick={clicker} className="w-20 h-20 bg-red-700"></div>
            </>
        );
    } else if (boulderStatus === 1) {
        return (
            <>
                <div onClick={clicker} className="w-20 h-20 bg-lime-400"></div>
            </>
        );
    } else if (boulderStatus === 2) {
        return (
            <>
                <div onClick={clicker} className="w-20 h-20 bg-sky-500"></div>
            </>
        );
    }
}
