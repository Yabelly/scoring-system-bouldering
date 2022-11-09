// This component shows the full list of competitors and their scoring
export default function Userslist({  userId, rankedUsers}) {



    return (
        <>
            
            <div></div>
            <div className=" bg-[#136F63] rounded-lg">
                <div className="flex place-content-evenly ">
                    <div className="text-3xl">Rank</div>
                    <div className="text-3xl">username</div>
                    <div className="text-3xl">total score</div>
                </div>
                {rankedUsers.map((competitor, idx) => (
                    <div
                        key={idx}
                        className={`grid
                         grid-cols-3 bg-[#FFBA08] ${
                             userId === competitor.id &&
                             `font-bold bg-[#fc7703]`
                         } rounded-full mx-2 px-1 mt-1.5`}
                    >
                        <div className="text-2xl"> {idx + 1}</div>
                        <div className="text-2xl"> {competitor.username}</div>
                        <div className="text-2xl">{competitor.summedScore}</div>
                    </div>
                ))}
            </div>
        </>
    );
}
