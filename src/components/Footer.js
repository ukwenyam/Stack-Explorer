
const Footer = ({time}) => {

    return (
        <div style={{background: '#000', width: '100%', padding: '20px', color: '#fff'}}>
            Request Time: {time/1000} secs
        </div>
    )
}

export default Footer