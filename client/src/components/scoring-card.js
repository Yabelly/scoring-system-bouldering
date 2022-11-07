// This component is the complete scoreform. it gets the scoring for each user and send the props to each "button" to Boulder.js
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import SingleBoulder from "./Boulder";
import { arrayFilled } from "../functions/rankingfunctions";
const socket = io();

export default function ScoringCard() {
    const [boulders, setBoulders] = useState([]);
    console.log("render happening ");
    console.log("boulders: ", boulders);

    // updates the scorecard from the server and sets it to local state

    useEffect(() => {
        let active = true;
        console.log("active: ", active);

        socket.on(`scorecard`, (data) => {
            const fullData = data.map((score) => ({
                status: score,
            }));
            setBoulders(fullData);
            try {
                localStorage.setItem(`scorecardata`, JSON.stringify(fullData));
            } catch {
                console.log("error in setting localstorage");
            }
        });
        console.log("running again");

        return () => {
            active = false;
        };
    }, [boulders]);

    // if (!arrayFilled(boulders)) {
    //     console.log("no boulders from socket");
    //     setBoulders(localStorage.getItem(`scorecardata`));
    // }

    function mapper() {
        if (arrayFilled(boulders)) {
            return boulders.map((boulder, idx) => (
                <SingleBoulder
                    boulderTwo={boulder}
                    id={idx}
                    clickHandler={clickHandler}
                    key={idx}
                ></SingleBoulder>
            ));
        }
    }

    // function to change the status of the individual boulders and updates the database with the new array
    function clickHandler(id) {
        boulders[id].status++;
        if (boulders[id].status > 2) {
            boulders[id].status = 0;
        }
        setBoulders([...boulders]);
        socket.emit(
            // ???? How do I update my server more cleanly without firing from the the serverside so much? see line 171 of index.js(server)????
            // How do i get consistency in my render when I send the data over. I don't know how to handle the async behaviour???
            `update`,
            boulders.map((boulder) => boulder.status)
        );
        console.log("update send to server");
    }

    return (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 xl:grid-cols-10">
                {mapper()}
            </div>
        </>
    );
}
