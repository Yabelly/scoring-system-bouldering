import { fetchGet } from "../functions/functions";

export default function Logout() {
    function removeCookie() {
        fetchGet("/api/logout").then((data) =>
            data ? window.location.replace("/") : console.log("ow damnnn")
        );
    }

    // logout is inconsistent and also makes login fragile maybe
    return (
        <>
            <button
                className="text-2xl bg-green-200 w-full"
                onClick={removeCookie}
            >
                Log Out
            </button>
        </>
    );
}
