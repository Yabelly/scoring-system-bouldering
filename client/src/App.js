import { useEffect, useState } from "react";
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
                <p>{!data ? "not connected to server!" : data}</p>
                <h1 className="text-3xl font-bold underline">if this  is underlined then TailwindCSS works. </h1>
            </header>
        </div>
    );
}

export default App;
