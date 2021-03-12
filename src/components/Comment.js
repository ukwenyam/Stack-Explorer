import ReactHtmlParser from 'react-html-parser'
import Paper from '@material-ui/core/Paper'

const Comment = ({comment}) => {

    return (
        <Paper style={{padding: '10px', background: 'rgb(183, 234, 250)'}}>
            <div style={{textAlign: 'left'}}>{ReactHtmlParser(comment.body)}</div>
        </Paper>
    )
}

export default Comment