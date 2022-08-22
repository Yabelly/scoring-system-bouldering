import Boulder from "./boulder";

export default function ScoringCard() {
    let boulderAmount = 40;

    const renderBoulders = () => {
        let compArray = new Array(boulderAmount).fill(<Boulder></Boulder>);
        return compArray;
    };

    return <> {renderBoulders()}</>;
}
