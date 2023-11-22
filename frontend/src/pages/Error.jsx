import Header from '../components/Header'
import PropTypes from 'prop-types'
import '../styles/main.css'

/**
 * Function component to display Error
 * @param {string} props 
 * @returns {JSX.Element}
 */
function Error(props){
        const message = props.message
        return(
            <>  
                <Header/>
                <div className="hero">
                    <p className="errorMessage">{message==='networkFailed'?"Le serveur ne répond pas, réessayez ultérieurement SVP":"Authentifiez-vous SVP"}</p>
                </div>
            </>
        )
}

Error.propTypes = {
    message: PropTypes.string
}
export default Error