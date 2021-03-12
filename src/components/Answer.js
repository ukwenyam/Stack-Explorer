import { Paper } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Comments from './Comments'

const Answer = ({answer}) => {

    const [comments, setComments] = useState([])

    const handleChange = async () => {
        if(comments.length === 0) {

            axios.get(`https://api.stackexchange.com/2.2/answers/${answer.answer_id}/comments?order=desc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`)
            .then((response) => {
                setComments(response.data.items)
            })
            .catch((err) => {
                console.log('error retrieving data due to', err);
            })
        }
    }
    return (
        <div>
            <Accordion onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    An Answer
                </AccordionSummary>
                <Paper>
                    <div style={{background: 'rgb(146, 255, 182)', padding: '10px'}}>
                        <div style={{textAlign: 'left'}}>{ReactHtmlParser(answer.body)}</div>
                    </div>
                    <div>
                        <Comments comments={comments} />
                    </div>
                </Paper>
            </Accordion>
        </div>
    );
}

export default Answer