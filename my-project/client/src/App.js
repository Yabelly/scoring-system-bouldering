import { useState, useEffect } from "react";
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
                <div className="text-3xl font-bold underline">something</div>
            </header>
        </div>
    );
}

export default App;

