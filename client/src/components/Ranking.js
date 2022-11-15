export default function Ranking({ userScore, userRank }) {
    return (
        <>
            <div>test</div>
            <div className="text-xl underline text-white">POINTS: {userScore}</div>
            <div className="text-xl underline text-white">RANK: {userRank}</div>
        </>
    );
}
