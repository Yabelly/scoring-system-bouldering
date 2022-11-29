import Item from "./Item";
import { fetchGet, fetchPost } from "../functions/functions";
// import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Scorecard({
    // setScoreCardArray,
    scoreCardArray,
    id,
}) {
    const queryClient = useQueryClient();
    console.log("queryClient: ", queryClient);

    const { isLoading, isError, data, error } = useQuery({
        queryKey: [`userarray`],
        queryFn: () => fetchGet(`/api/userarray`),
    });

    const mutation = useMutation({
        mutationFn: async (newData) => {
            const stuff = await fetchPost(`/api/updateuserarray`, { newData, id });
            console.log("stuff: ", stuff);
            
        },
        onMutate: async (newData) => {
            // console.log("newData: ", newData);
            await queryClient.cancelQueries({ queryKey: [`userarray`] });

            const previousData = queryClient.getQueriesData([`userarray`]);

            console.log("previousData: ", previousData);
            console.log("newData: ", newData);

            queryClient.setQueryData([`userarray`], (oldData) =>  [...oldData,  newData,])
            return { previousData };
        },
        onError: (err, newData, context) => {
            console.log("context.previousData: ", context.previousData);

            queryClient.setQueriesData([`userarray`], context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [`userarray`] });
        },
        // onSuccess: (data) => {
        //     console.log("succesfull mutation");
        //     // queryClient.setQueryData(["userarray"], (oldQueryData) => {
        //     //     console.log("going here");

        //     //     return {
        //     //         ...oldQueryData,
        //     //         data: [oldQueryData.data, data.data],
        //     //     };
        //     // });
        //     queryClient.invalidateQueries({ queryKey: ["userarray"] });
        //     console.log("getting");

        // },
    });
    console.log("mutation: ", mutation);

    const scorecardUpdater = (array, i) => {
        const a = [...array];
        a[i]++;
        if (a[i] > 2) {
            a[i] = 0;
        }
        return a;
    };

    const clickHandler = (idx) => {
        const newScoreCardArray = scorecardUpdater(scoreCardArray, idx);
        // console.log("newScoreCardArray: ", newScoreCardArray);
        mutation.mutate(newScoreCardArray);
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
                {data.scoring.map((item, idx) => (
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
