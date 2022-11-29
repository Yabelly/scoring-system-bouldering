import Item from "./Item";

export default function OtherUser({ otherCompetitor }) {
    console.log("otherCompetitor: ", otherCompetitor);

    return (
        <>
            <div className="absolute z-10 w-full bg-black">
                <div>{otherCompetitor.username}</div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 xl:grid-cols-10 w-8/12 m-auto">
                    {otherCompetitor.scoring.map((item, idx) => (
                        <Item item={item} id={idx} key={idx}></Item>
                    ))}
                </div>
            </div>
        </>
    );
}
