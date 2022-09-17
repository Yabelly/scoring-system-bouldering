import { useState } from "react";
export default function CreateComp() {
    const [compName, setCompName] = useState("");
    const [boulderAmount, setBoulderAmount] = useState(3);
    const compFormat = "classic";
    // replace with state when v1 is done
    // const [compFormat, setCompFormat] = useState("classic");

    function submitComp(e) {
        e.preventDefault();
        console.log(
            "compName, boulderAmount, compFormat: ",
            compName,
            boulderAmount,
            compFormat
        );

        fetch("/api/newcomp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ compName, boulderAmount, compFormat }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data back from server: ", data);
            })

            .catch((err) => console.log("err: ", err));
    }

    return (
        <form className="bg-orange-300">
            <label>name of the competition:</label>
            <input
                name="compname"
                type="text"
                placeholder={compName}
                onChange={(e) => setCompName(e.target.value)}
            ></input>
            <label>amount of qualification boulders (3-100)</label>
            <input
                type="number"
                name="bouldersamount"
                min="3"
                max="100"
                onChange={(e) => setBoulderAmount(e.target.value)}
            ></input>

            <button
                onClick={(e) => {
                    submitComp(e);
                }}
            >
                create competition
            </button>
        </form>
    );
}
