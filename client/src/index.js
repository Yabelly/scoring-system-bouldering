import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dashboard from "./components/Dashboard";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { fetchGet } from "./functions/functions";

const root = ReactDOM.createRoot(document.getElementById("root"));

fetchGet("/api/id.json").then((data) => {
    if (!data.userId) {
        console.log("nocookie: ");
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        );
    } else {
        console.log("yescookie");
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <Dashboard />
                </BrowserRouter>
            </React.StrictMode>
        );
    }
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
