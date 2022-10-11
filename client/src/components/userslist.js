// This component shows the full list of competitors and their scoring
export default function Userslist(props) {
    const { rankedUsers } = props;

    // write a function to render the users by userName with processedUsers

    // !! rework this so results are represented and standings
    return (
        <>
            <div className=" bg-[#136F63] rounded-lg">
                <div className="flex place-content-evenly ">
                    <div className="text-3xl">Rank</div>
                    <div className="text-3xl">username</div>
                    <div className="text-3xl">total score</div>
                </div>
                {rankedUsers.map((competitor, idx) => (
                    <div
                        key={idx}
                        className="flex place-content-evenly bg-[#FFBA08] rounded-full mt-1"
                    >
                        <div className="text-2xl"> {idx + 1}</div>
                        <div className="text-2xl"> {competitor.username}</div>
                        <div className="text-2xl"> {competitor.summedScore}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
