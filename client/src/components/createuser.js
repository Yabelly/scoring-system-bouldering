import { useState } from "react";

export default function CreateUser() {
    const [userName, setUserName] = useState("");

    function inputName({ target }) {
        setUserName(target.value);
    }

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
        <form>
            <input
                name="username"
                type="text"
                placeholder="username"
                onChange={(e) => inputName(e)}
            ></input>
            <button
                onClick={(e) => {
                    submitUserName(e);
                }}
            >
                Register
            </button>
        </form>
    );
}
