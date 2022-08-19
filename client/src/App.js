import { useEffect, useState } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Boulder from "./boulder";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/test")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <main>
                <Boulder></Boulder>
                <p>{!data ? "not connected to server!" : data}</p>
                <h1 className="text-3xl font-bold underline">
                    if this is underlined then TailwindCSS works.{" "}
                </h1>
            </main>
        </div>
    );
}

export default App;
