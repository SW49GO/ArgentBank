import { Link } from 'react-router-dom'
import '../styles/main.css'
import React from 'react'


function Header(){

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
            <Link to={`/login`} className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
        </div>
      </nav>
    )
}
// mémoriser le rendu de Header
export default React.memo(Header)

