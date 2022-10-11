export default function UserRank({ userId, rankedUsers }) {
    
    const rank = rankedUsers.map((obj) => obj.id).indexOf(userId) + 1;

    const userPoints = rankedUsers.filter((obj) => obj.id === userId);

    return (
        <>
            {rank === 0 && <div>no score</div>}
            {rank !== 0 && (
                <div>
                    <div className="text-xl underline text-white">
                        rank: {rank}
                    </div>
                    <div className="text-xl underline text-white">
                        points: {userPoints[0].summedScore}
                    </div>
                </div>
            )}
        </>
    );
}
