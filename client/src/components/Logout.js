export default function Logout() {
    function removeCookie() {
        fetch("/api/logout");
    }

    return (
        <>
            <button onClick={removeCookie()}></button>
        </>
    );
}
