import Answer from "./Answer"

const Answers = ({answers}) => {

    return (
        <div>
            {answers.length > 0 && <h1>Answers - {answers.length}</h1>}
            {answers && answers.map(answer => {
                return (
                    <Answer answer={answer} />
                )
            })}
        </div>
    )
}

export default Answers