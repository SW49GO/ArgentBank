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
    // register :  enregistrent les champs de saisie et les associent à l'état interne de useForm()
    // handleSubmit : gère la soumission du formulaire en prenant en charge la validation des champs enregistrés avec register
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const rememberUser = localStorage.getItem('rememberMe')
    // Création d'un instance du client de requête, interface qui permet d'interagir avec le système de cache
    const queryClient = useQueryClient()
    // State pour valider le formulaire et permettre l'envoi de la requête
    const [isFormSubmit, setFormSubmit] = useState(false)
    const email = useSelector(selectEmail)
    const password = useSelector(selectPassword)

    // isError : booléen qui indique si une erreur s'est produite lors de la récupération des données
    // error : objet qui contient des détails sur l'erreur qui s'est produite
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
             setFormSubmit(true)
             // Invalide le résultat dans le cache de la requête 'login' et signale à React Query qu'il faut rafraichir la requête 'login' au prochain useQuery qui a la queryKey correspondante
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
                    {/* Gestion des erreurs de requête */}
                    {(error && error.message==='400') && <p>Les identifiants sont icorrectes</p>}
                    {(isError && error.message==='Failed to fetch') && <p>Erreur serveur inattendue</p>}
                </form>
            </section>
        </main>
    </>
    )
}
export default Login