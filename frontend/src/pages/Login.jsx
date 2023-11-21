import Header from "../components/Header"
import '../styles/main.css'
function Login(){
    return(
        <>
        <Header/>
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="email" id="username" name="username"/>
                    </div>
                    <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"/>
                    </div>
                    <div className="input-remember">
                    <input type="checkbox" id="remember-me" name="rememberMe"/>
                    <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button">Sign In</button> 
                </form>
            </section>
        </main>
    </>
    )
}
export default Login