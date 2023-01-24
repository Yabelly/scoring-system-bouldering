import { fetchGet } from "../functions/functions";
import { useQuery } from "@tanstack/react-query";

export default function Ranking({ userName }) {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["rankInfo"],
        queryFn: () => fetchGet("/api/rankinfo"),
    });

    if (isLoading) {
        return <span className="bg-white">Loading...</span>;
    }

    if (isError) {
        return <span className="bg-white">Error: {error.message}</span>;
    }

    const userRank =
        data.rank.map((user) => user.username).indexOf(userName) + 1;

    return (
        <>
            <div className="text-xl underline text-white">
                POINTS: {data.points[0].total_points}
            </div>
            <div className="text-xl underline text-white">RANK: {userRank}</div>
        </>
    );
}
