import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Test from "./components/Test";

const root = ReactDOM.createRoot(document.getElementById("root"));

fetch("/api/id.json")
    .then((resp) => resp.json())
    .then((data) => {
        console.log("data: ", data);
        if (!data.userId) {
            console.log("nocookie: ");
            root.render(
                <React.StrictMode>
                    <BrowserRouter>
                        <Test />
                    </BrowserRouter>
                </React.StrictMode>
            );
        } else {
            console.log("yescookie");
            root.render(
                <React.StrictMode>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </React.StrictMode>
            );
        }
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
