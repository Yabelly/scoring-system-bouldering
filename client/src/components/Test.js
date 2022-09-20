import { Routes, Route, Link } from "react-router-dom";
import Next from "./Next";

export default function Test() {
    return (
        <>
            <nav className="w-full h-1/6 w-full bg-red-300 flex justify-evenly">
                <Link to="/">teeeest</Link>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<Next />} />
                </Routes>
            </main>
        </>
    );
}
