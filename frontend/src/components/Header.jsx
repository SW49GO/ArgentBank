import {setAllClosed, setIsAuthUser, setSummaryVisible} from '../features/store'
import { selectAuth, selectFirstname } from '../features/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import '../styles/main.css'
import React from 'react'

/**
 * Function component to display header
 * @returns {JSX.Element}
 */
function Header(){
  const dispatch = useDispatch()
  // Check if the user is already logged in to change the icon
  const isAuthUser = useSelector(selectAuth)
  const firstName = useSelector(selectFirstname)

    return(
      <>
      <nav className="main-nav">
        <Link to={`/`} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={process.env.PUBLIC_URL + '/assets/argentBankLogo.png'}
            alt="Argent Bank Logo"
            aria-label="Page d'accueil ArgentBank"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {(isAuthUser) ?<>
            <div className='main-nav-sign-out'>
              <Link to={`/profile`} className='main-nav-user' onClick={()=>{dispatch(setAllClosed(false)); dispatch(setSummaryVisible(true))}}>
                <i className="fa fa-user-circle"></i>
                <p aria-label="Accès page sommaire des comptes">{firstName}</p>
              </Link>
              <Link to={`/`} className="main-nav-item" onClick={() => {dispatch(setIsAuthUser(false)); dispatch(setAllClosed(false)); dispatch(setSummaryVisible(true)); sessionStorage.clear()}} >
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </div>
            </>
            :
            <Link to={`/login`} className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          }
        </div>
      </nav>
      </>
    )
}
// Remember the rendering of Header with React.memo
export default React.memo(Header)

