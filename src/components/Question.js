import { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import { makeStyles, Paper } from '@material-ui/core';
import { Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import styles from '../styles/Question.module.css'
import axios from 'axios';
import Comments from './Comments';
import Answers from './Answers'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Question = ({question}) => {

    const classes = useStyles();
    let aDate = new Date(question.creation_date  * 1000)
    const date = useState(aDate.toLocaleDateString())
    const [comments, setComments] = useState([])
    const [answers, setAnswers] = useState([])

    const handleChange = async() => {
        if(answers.length === 0) {
            axios.get(`https://api.stackexchange.com/2.2/questions/${question.question_id}/answers?order=desc&sort=activity&site=stackoverflow&filter=!9_bDE(fI5`)
            .then((response) => {
                setAnswers(response.data.items)
            })
            .catch((err) => {
                console.log('error retrieving data due to', err);
            })

            axios.get(`https://api.stackexchange.com/2.2/questions/${question.question_id}/comments?order=desc&sort=creation&site=stackoverflow&filter=!9_bDE0E4s`)
            .then((response) => {
                setComments(response.data.items)
            })
            .catch((err) => {
                console.log('error retrieving data due to', err);
            })
        }
    }

    return (
        <div className={styles.container}>
            <Accordion onChange={handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell styles={{width: '500px', background: '#000'}} size="small" align="left">{question.title}</TableCell>
                                    <TableCell align="left">{date}</TableCell>
                                    <TableCell align="right">{question.score}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                </AccordionSummary>
                <Paper>
                    <div className={styles.questionBody}>
                        <div style={{textAlign: 'left'}}>{ReactHtmlParser(question.body)}</div>
                    </div>
                    <div className={styles.comments}>
                        <Comments comments={comments} />
                    </div>
                    <div className={styles.answers}>
                        <Answers answers={answers} />
                    </div>
                </Paper>
            </Accordion>
        </div>
    )
}

export default Question