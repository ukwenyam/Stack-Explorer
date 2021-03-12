import Answer from "./Answer"

const Answers = ({answers}) => {

    return (
        <div>
            <h1>{answers.length > 0 ? "Answers - " + answers.length : "No Answers found for this question"}</h1>
            {answers && answers.map(answer => {
                return (
                    <Answer answer={answer} />
                )
            })}
        </div>
    )
}

export default Answers