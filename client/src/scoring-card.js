import Boulder from "./boulder";

export default function ScoringCard() {
    let boulderAmount = 3;
    let compArray = Array(boulderAmount).fill(<Boulder></Boulder>);

    // const listItems = compArray.map((boulder, idx) => {
    //     console.log("boulder: ", boulder);
    //     console.log("idx: ", idx);
    //     // boulder.idx = idx;
    //     return boulder;
    // });

    return <>{}{compArray}</>;
}
