// General welcome component. This will eventually whos some goal explanation of the app. This will render when use is not logged in.
import { Link } from "react-router-dom";
export default function Welcome() {
    return (
        <>
            <div className="underline text-5xl flex flex-col justify-center items-center">
                welcome
            </div>
            <br></br>
            <div className="flex justify-evenly">
                <Link
                    className="w-60 bg-blue-400 text-center text-3xl"
                    to="createcomp"
                >
                    create a competition
                </Link>

                <Link
                    className="w-60 bg-red-400 text-center text-3xl"
                    to="competitions"
                >
                    current competitions
                </Link>
            </div>
        </>
    );
}
