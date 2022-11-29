export const fetchGet = async (url) => {
    try {
        const res = await fetch(url);
        console.log(`status response from url ${url}: `, res.ok);
        return res.json();
    } catch (err) {
        console.error(err);
    }
};

export const fetchPost = async (url, { ...postObjects }) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...postObjects }),
        });
        console.log(`status response from url ${url}: `, res.ok);
        return res.json();
    } catch (err) {
        console.error(err);
    }
};
