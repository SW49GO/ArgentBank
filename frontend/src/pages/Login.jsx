import { selectEmail, selectPassword } from '../features/selectors'
import { useValidationForm } from '../hooks/useValidationForm'
import { setUserConfigConnect } from '../features/store'
import { useQueryClient, useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../services/api'
import Header from '../components/Header'
import { useForm}  from 'react-hook-form'
import { useState } from 'react'
import '../styles/main.css'


/**
 * Function component to display Login's form
 * @returns {JSX.Element}
 */
function Login(){
    // register: register input fields and associate them with the internal state of useForm()
    // handleSubmit: handles form submission by supporting validation of fields saved with register
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Creation of an instance of the query client, interface which allows you to interact with the cache system
    const queryClient = useQueryClient()
    // State to validate the form and allow the request to be sent
    const [isFormSubmit, setFormSubmit] = useState(false)
    
    const rememberUser = localStorage.getItem('rememberMe')
    const password = useSelector(selectPassword)
    const email = useSelector(selectEmail)


    // isError : boolean that indicates whether an error occurred while retrieving data
    // error : object that contains details about the error that occurred
    const { error, isError} = useQuery('login', () => fetchData({email, password}),
    // Disabled as long as the isFormSubmit is empty
    { enabled:isFormSubmit,
      retry:1,
      onSuccess: (data) => {if (data && data.body && data.body.token) {
        sessionStorage.setItem('JWT', data.body.token);
        navigate('/profile');
      }},
      onError: () => {setFormSubmit(false)}
    })

    /**
     * Function to retrieve data from Form, verify data, 
     * dispatch action to redux store and call hook useQuery
     * @param {object} data 
     */
    function OnSubmit(data){
        const {username, password, rememberMe} = data
        const verifyData = useValidationForm({email:username, password:password})
        if(rememberMe){
             localStorage.setItem('rememberMe',true)
             localStorage.setItem('username',username)
             localStorage.setItem('password',password)
         }else{
             localStorage.clear()
         }
         if(verifyData){
             dispatch(setUserConfigConnect({email:username, password:password, rememberMe:rememberMe}))
             setFormSubmit(true)
            // Invalidates the result in the cache of the 'login' query 
            // and signals React Query to refresh the 'login' query at the next useQuery that has the corresponding queryKey
             queryClient.invalidateQueries('login')
         }
     }

    return(
        <>
        <Header/>
        <main className="main bg-dark">
        <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
            {/*Calling the OnSubmit function by sending the data object (form fields) as an argument*/}
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
                    {/* Handling query errors */}
                    {(error && error.message==='400') && <p>Les identifiants sont icorrectes</p>}
                    {(isError && error.message==='Failed to fetch') && <p>Erreur serveur inattendue</p>}
                </form>
            </section>
        </main>
    </>
    )
}
export default Login