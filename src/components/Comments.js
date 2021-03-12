import Comment from "./Comment"


const Comments = ({comments}) => {

    return (
        <div>
            <h1>{comments.length > 0 ? "Comments - " + comments.length : "No comments found"}</h1>
            {comments && comments.map((comment) => {
                return (
                    <Comment comment={comment} />
                )
            })}
        </div>
    )
}

export default Comments