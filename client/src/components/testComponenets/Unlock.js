import { useState } from "react";

export default function Unlock({ setLocked }) {
    const [time, setTime] = useState(false);

    const touchStart = () => {
        console.log("touchevent has occured");
        setTimeout(() => {
            console.log("2 seconds have happemed");
            setTime(true);
        }, 1000);
    };

    const touchEnd = () => {
        console.log("touchEnd event has happened");

        if (time) {
            console.log("event has lasted 2 sec");
            setLocked(false);
            setTime(false);
            console.log("time: ", time);
        }
    };

    return (
        <>
            <div
                className="bg-neutral-600/50 w-full h-full"
                onTouchStart={() => touchStart()}
                onTouchEnd={() => touchEnd()}
            >
                test
            </div>
        </>
    );
}
