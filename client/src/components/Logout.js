import { fetchGet } from "../functions/functions";

export default function Logout() {
    function removeCookie() {
        fetchGet("/api/logout").then((data) =>
            data ? window.location.replace("/") : console.log("ow  something is wrong with this logout component")
        );
    }

    return (
        <>
            <button
                className="text-xl bg-[#D00000] rounded-full p-1 text-white  m-2.5"
                onClick={removeCookie}
            >
                Log Out
            </button>
        </>
    );
}
