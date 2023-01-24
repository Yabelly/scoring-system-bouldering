import Item from "./Item";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pointsClassic, totalPoints } from "../functions/rankingfunctions";

export default function Scorecard() {
    async function fetchArray() {
        const res = await fetch(`/api/userarray`);
        const { scoring } = await res.json();
        return scoring;
    }

    const {
        data: scoring,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["userarray"],
        queryFn: fetchArray,
    });

    async function updateArray(obj) {
        const res = await fetch("/api/updateuserarray", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const { scoring } = await res.json();
        return scoring;
    }

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateArray,
        onMutate: (obj) => {
            const { newScoreCardArray, totalAmountOfScoreUser } = obj;
            // queryClient.setQueryData([`userarray`], (old) => {
            //     [...old, updatedArray];
            // });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [`userarray`] });
        },
    });
    const scorecardUpdater = (array, i) => {
        const a = [...array];
        a[i]++;
        if (a[i] > 2) {
            a[i] = 0;
        }
        return a;
    };

    const clickHandler = async (idx) => {
        const newScoreCardArray = scorecardUpdater(scoring, idx);
        const totalAmountOfPointsUser = pointsClassic(newScoreCardArray);
        const totalAmountOfScoreUser = await totalPoints(
            totalAmountOfPointsUser
        );
        console.log("totalAmountOfScoreUser: ", totalAmountOfScoreUser);
        mutate({ newScoreCardArray, totalAmountOfScoreUser });
    };

    if (isLoading) {
        return <span className="bg-white">Loading...</span>;
    }

    if (isError) {
        return <span className="bg-white">Error: {error.message}</span>;
    }

    return (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 xl:grid-cols-10">
                {scoring.map((item, idx) => (
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
