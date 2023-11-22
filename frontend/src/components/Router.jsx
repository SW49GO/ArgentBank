import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Footer from './Footer'

/**
 * Component function for routing
 * @returns {JSX.Element}
 */
function Router(){

    return ( <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Home/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='*' element={<Error/>}/>
                    </Routes>
                <Footer/>
            </BrowserRouter>
            )
}

export default Router