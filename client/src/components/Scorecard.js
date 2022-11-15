import Item from "./Item";
import { fetchPost } from "../functions/functions";
import { useEffect } from "react";

export default function Scorecard({
    setScoreCardArray,
    scoreCardArray,
    id,
    error,
    setError,
}) {
    useEffect(() => {
        fetchPost(`/api/updateuserarray`, { scoreCardArray, id }).then((data) =>
            data.succes === true ? setError(false) : setError(true)
        );
    }, [scoreCardArray, id, setError]);

    const scorecardUpdater = (array, i) => {
        const a = [...array];
        a[i]++;
        if (a[i] > 2) {
            a[i] = 0;
        }
        return a;
    };

    const clickHandler = (idx) => {
        setScoreCardArray(scorecardUpdater(scoreCardArray, idx));
    };

    return (
        <>
            {error && (
                <div className="bg-white">
                    error occured when updating database
                </div>
            )}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 xl:grid-cols-10">
                {scoreCardArray.map((item, idx) => (
                    <Item
                        clickHandler={clickHandler}
                        item={item}
                        id={idx}
                        key={idx}
                    ></Item>
                ))}
            </div>
        </>
    );
}
