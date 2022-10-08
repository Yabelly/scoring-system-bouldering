// This component is a single boulder button getting the status from the scorecard component.

export default function SingleBoulder({ boulder, id, clickHandler }) {
    let boulderStatus = {};

    //
    // boulder.status 0: no send at all
    // boulder.status 1: send in first try
    // boulder.status 2: send more then 1 try
    if (boulder.status === 0) {
        boulderStatus.visuals = "bg-red-500";
        boulderStatus.text = "Nope";
    } else if (boulder.status === 1) {
        boulderStatus.visuals = "bg-lime-400";
        boulderStatus.text = "Top";
    } else if (boulder.status === 2) {
        boulderStatus.visuals = "bg-sky-500";
        boulderStatus.text = "Flash";
    }

    return (
        <>
            <div
                onClick={() => clickHandler(id)}
                className={`aspect-square flex flex-col border-solid border-2 border-black ${boulderStatus.visuals}`}
            >
                <div className="text-center">{boulderStatus.text}</div>
                <div className="text-center"> {id + 1}</div>
            </div>
        </>
    );
}
