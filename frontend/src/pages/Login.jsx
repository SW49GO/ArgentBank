import { useDispatch } from "react-redux"
import Header from "../components/Header"
import '../styles/main.css'
import {useForm} from 'react-hook-form'
import { setUserConfigConnect } from "../features/store"
import { useValidationForm } from "../hooks/useValidationForm"

function Login(){
    // register :  enregistrent les champs de saisie et les associent à l'état interne de useForm()
    // handleSubmit : gère la soumission du formulaire en prenant en charge la validation des champs enregistrés avec register
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const rememberUser = localStorage.getItem('rememberMe')

    function OnSubmit(data){
        const {username, password, rememberMe} = data
        const verifyData = useValidationForm({email:username, password:password})
        console.log('verifyData:', verifyData)
        if(rememberMe){
             localStorage.setItem('rememberMe',true)
             localStorage.setItem('username',username)
             localStorage.setItem('password',password)
         }else{
             localStorage.clear()
         }
         if(verifyData){
             dispatch(setUserConfigConnect({email:username, password:password, rememberMe:rememberMe}))
         }
     }

    return(
        <>
        <Header/>
        <main className="main bg-dark">
        <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
            {/* Appel de la fonction OnSubmit en envoyant en argument l'objet data (champs formulaire) */}
                <form onSubmit={handleSubmit(OnSubmit)}>
                    <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input type="email" id="username" name="username" required
                        placeholder={(rememberUser === "true") ? localStorage.getItem('username') : null}
                        defaultValue={(rememberUser === "true") ? localStorage.getItem('username') : ''}
                        {...register('username')} />
                    </div>
                    <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required 
                        placeholder={(rememberUser === "true") ? localStorage.getItem('password') : null}
                        defaultValue={(rememberUser === "true") ? localStorage.getItem('password') : ''}
                        {...register('password')} />
                    </div>
                    <div className="input-remember">
                    <input type="checkbox" id="remember-me" name="rememberMe" 
                        defaultChecked={rememberUser === "true"}
                        {...register('rememberMe')} />
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