import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>{!data ? "Loading..." : data}</p>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </header>
        </div>
    );
}

export default App;
