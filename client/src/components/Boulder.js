// This component is a single boulder button getting the status from the scorecard component. 

export default function SingleBoulder({ boulder, id, clickHandler }) {
    console.log("boulder: ", boulder);
    let boulderStatus = {};

    //
    // boulder.status 0: no send at all
    // boulder.status 1: send in first try
    // boulder.status 2: send more then 1 try
    if (boulder.status === 0) {
        boulderStatus.visuals = "bg-red-700";
        boulderStatus.text = "No Top";
    } else if (boulder.status === 1) {
        boulderStatus.visuals = "bg-lime-400";
        boulderStatus.text = "Flashed";
    } else if (boulder.status === 2) {
        boulderStatus.visuals = "bg-sky-500";
        boulderStatus.text = "Topped";
    }

    return (
        <>
            <div
                onClick={() => clickHandler(id)}
                className={`w-16 h-16 flex flex-col ${boulderStatus.visuals}`}
            >
                <div className="text-center">{boulderStatus.text}</div>
                <div className="text-center text-2xl"> {id + 1}</div>
            </div>
        </>
    );
}
