export default function Logout() {
    function removeCookie() {
        console.log("clickes");

        fetch("/api/logout");
    }

    // logout is inconsistent and also makes login fragile maybe
    return (
        <>
            <button onClick={removeCookie}>Log Out</button>
        </>
    );
}
