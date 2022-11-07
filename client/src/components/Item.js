export default function Item({ clickHandler, item, id }) {
    let boulderStatus = {};

    if (item === 0) {
        boulderStatus.visuals = "bg-[#136F63]";
        boulderStatus.text = "Nope";
    } else if (item === 1) {
        boulderStatus.visuals = "bg-[#3F88C5]";
        boulderStatus.text = "Top";
    } else if (item === 2) {
        boulderStatus.visuals = "bg-[#FFBA08]";
        boulderStatus.text = "Flash";
    }

    return (
        <>
            <div
                onClick={() => clickHandler(id)}
                className={`aspect-square flex flex-col border-solid border-2 border-black rounded-lg ${boulderStatus.visuals}`}
            >
                <div className="text-center text-2xl mt-4">
                    {boulderStatus.text}
                </div>
                <div className="text-center text-4xl mt-1"> {id + 1}</div>
            </div>
        </>
    );
}
