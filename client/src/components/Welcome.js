// General welcome component. This will eventually whos some goal explanation of the app. This will render when use is not logged in.
import { Link } from "react-router-dom";
export default function Welcome() {
    return (
        <>
            <div>BOULDERCOMP BETA</div>
            <div className="flex flex-col justify-evenly">
                <div className="text-center text-white text-5xl">
                    BOULDERCOMP BETA
                </div>

                <div className="text-center inline-block text-lg  text-white">
                    ALFA TEST
                </div>
                <br></br>
                <br></br>
                <br></br>
                <Link
                    className="bg-[#D00000] rounded-full p-1.5 text-white m-2.5 text-3xl text-center"
                    to="createuser"
                >
                    JOIN COMPETITION
                </Link>
                <br></br>
                <Link
                    className="bg-[#D00000] rounded-full p-1.5 text-white m-2.5 text-3xl text-center"
                    to="login"
                >
                    LOGIN
                </Link>
            </div>
        </>
    );
}
