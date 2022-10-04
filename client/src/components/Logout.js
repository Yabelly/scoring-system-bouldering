export default function Logout() {
    function removeCookie() {
        console.log("clickes");
        fetch("/api/logout")
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data: ", data);
                if (data.success) {
                    window.location.replace("/");
                } else {
                    console.log("ow damnnn");
                }
            });
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
