import { selectAuth, selectFirstname } from '../features/selectors'
import { useSelector, useDispatch } from 'react-redux'
import {setIsAuthUser} from '../features/store'
import { Link } from 'react-router-dom'
import '../styles/main.css'
import React from 'react'


function Header(){
  const dispatch = useDispatch()
  // Verify si l'utilisateur est déjà connecté pour changer l'icone
  const isAuthUser = useSelector(selectAuth)
//   const isAuthUser = true
  console.log('isAuthUser:', isAuthUser)
  const firstName = useSelector(selectFirstname)

    return(
      <nav className="main-nav">
        <Link to={`/`} className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={process.env.PUBLIC_URL + '/assets/argentBankLogo.png'}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {(isAuthUser) ?<>
            <div className='main-nav-sign-out'>
              <Link to={`/profile`} className='main-nav-user'>
                <i className="fa fa-user-circle"></i>
                <p>{firstName}</p>
              </Link>
              <Link to={`/`} className="main-nav-item" onClick={() => {dispatch(setIsAuthUser(false)); sessionStorage.clear()}}>
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
    )
}
// mémoriser le rendu de Header
export default React.memo(Header)

