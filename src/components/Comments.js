import Comment from "./Comment"


const Comments = ({comments}) => {

    return (
        <div>
            {comments.length > 0 && <h1>Comments - {comments.length}</h1>}
            {comments && comments.map((comment) => {
                return (
                    <Comment comment={comment} />
                )
            })}
        </div>
    )
}

export default Comments