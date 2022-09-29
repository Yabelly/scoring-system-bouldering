export default function Logout() {
    function removeCookie() {
        fetch("/api/logout");
    }

    // logout is inconsistent and also makes login fragile maybe
    return (
        <>
            <button onClick={removeCookie()}>Log Out</button>
        </>
    );
}
