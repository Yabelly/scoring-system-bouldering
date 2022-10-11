// This component shows the full list of competitors and their scoring
export default function Userslist(props) {

    
    const { rankedUsers, processedUsers} = props;

    // write a function to render the users by userName with processedUsers

    // !! rework this so results are represented and standings
    return (
        <>
            <div className="bg-red-200 h-full w-full">
                <div className="flex place-content-evenly">
                    <div className="text-2xl">Rank</div>
                    <div className="text-2xl">username</div>
                    <div className="text-2xl">total score</div>
                </div>
                {rankedUsers.map((competitor, idx) => (
                    <div key={idx} className="flex place-content-evenly">
                        <div> {idx + 1}</div>
                        <div> {competitor.username}</div>
                        <div> {competitor.summedScore}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
