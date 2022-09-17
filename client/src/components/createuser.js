import { useState } from "react";

export default function CreateUser() {
    const [userName, setUserName] = useState("");

    function submitUserName(e) {
        e.preventDefault();
        fetch("/api/newuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data back from server: ", data);
            })

            .catch((err) => console.log("err: ", err));
    }

    return (
        <>
            <form className="bg-blue-200">
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                ></input>

                <button
                    onClick={(e) => {
                        submitUserName(e);
                    }}
                >
                    Register
                </button>
            </form>
        </>
    );
}
