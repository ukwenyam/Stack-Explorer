import { Button, makeStyles, Paper, TextField } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

import Questions from './Questions'
import styles from '../styles/Explorer.module.css'
import Footer from './Footer'

const useStyles = makeStyles({
    root: {
        background: 'rgba(230, 144, 65, 0.952)'
    }
})

const Explorer = () => {

    const classes = useStyles()
    const [tag, setTag] = useState('');
    const [questions, setQuestions] = useState()
    const [relatedQuestions, setRelatedQuestions] = useState()
    const [loading, setLoading] = useState(false)
    const [requestTime, setRequestTime] = useState(-1)

    const handleSubmit = async (e) => {
        e.preventDefault();
        var question_ids = ''
        setLoading(true)
        
        var ourDate = new Date();

        //Change it so that it is 7 days in the past.
        var pastDate = ourDate.getDate() - 7;
        ourDate.setDate(pastDate);
        const fromdate = (ourDate.getTime() - ourDate.getTime() % 1000) /1000

        const start_time = new Date().getTime()
        await axios.get(`https://api.stackexchange.com/2.2/questions?page=1&pagesize=10&fromdate=${fromdate}&order=desc&sort=votes&tagged=${tag}&site=stackoverflow&filter=!9_bDDxJY5`)
        .then((response) => {
            setQuestions(response.data.items);
            response.data.items.forEach((question, index) => {
                question_ids += question.question_id + (response.data.items.length-1 === index ? '' : ';')
            })
        })
        .catch((err) => {
            console.log('error retrieving data due to', err);
            setLoading(false)
        })

        await axios.get(`https://api.stackexchange.com/2.2/questions/${question_ids}/related?page=1&pagesize=10&order=desc&sort=votes&site=stackoverflow&filter=!9_bDDxJY5`)
        .then((response) => {
            setRelatedQuestions(response.data.items);
        })
        .catch((err) => {
            console.log('error retrieving data due to', err);
            setLoading(false)
        })

        setRequestTime(new Date().getTime() - start_time)
        setLoading(false)
    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Paper className={styles.description} classes={classes}>
                    Welcome to Stack-Explorer! Please type in a tag and submit to find recent stackoverflow questions related to this tag
                </Paper>
                <Paper className={styles.paper} elevation={3}>
                    <label className={styles.label}>
                        <span>Enter Tag to search for</span>
                    </label>
                    <TextField className={styles.input} fullWidth variant="filled" label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} required />
                    <Button className={styles.submit} variant="contained" color="primary" type="submit" >Submit</Button>
                </Paper>
            </form>
            { loading && <CircularProgress /> }
            { questions && <Questions questions={questions} title={'Questions'}/>}
            { relatedQuestions && <Questions questions={relatedQuestions} title={'Related Questions'}/>}
            {requestTime >= 0 && <Footer time={requestTime} />}
        </div>
    );
}

export default Explorer