import Question from './Question';
import styles from '../styles/Questions.module.css';
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});
  
const Questions = ({questions, title}) => {

    const classes = useStyles();

    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            <TableCell align="center">Votes</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

            {questions.map((question) => {
                return (
                    <Question key={question.question_id} question={question}/>
                )
            })}
        </div>
    )
}
    
export default Questions;