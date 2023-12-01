import { selectFirstname, selectEditName, selectLastname, selectSummary, selectChecking, selectSaving, selectCredit, selectAuth } from '../features/selectors'
import HeaderCreditCard from '../components/headers/HeaderCreditCard'
import SummaryTransaction from '../components/SummaryTransaction'
import HeaderChecking from '../components/headers/HeaderChecking'
import DetailTransaction from '../components/DetailTransaction'
import HeaderSaving from '../components/headers/HeaderSaving'
import { useDispatch, useSelector } from 'react-redux'
import { setEditNameVisible } from '../features/store'
import { authUser } from '../middlewares/authUser'
import { setIsAuthUser } from '../features/store'
import { useNavigate } from 'react-router-dom'
import EditName from '../components/EditName'
import Header from '../components/Header'
import { useQuery } from 'react-query'
import Error from '../pages/Error'
import '../styles/main.css'


/**
 * Function to display summary account when user authentified
 * @returns {JSX.Element}
 */
function Profile(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const isSummaryVisible = useSelector(selectSummary)
    const isEditVisible = useSelector(selectEditName)
    const isChecking = useSelector(selectChecking)
    const firstname= useSelector(selectFirstname)
    const lastname = useSelector(selectLastname)
    const isSaving = useSelector(selectSaving)
    const isCredit = useSelector(selectCredit)
    const authUserOk = useSelector(selectAuth)

    // Request using Thunk middleware to authenticate the user
    const { data, error, isLoading } = useQuery('authUser', () => {
        const fetchResponse = async () => {
            const response = await dispatch(authUser())
            if (response.payload === false) {
              dispatch(setIsAuthUser(false))
              navigate('/login');
            }
            return response.payload
          }
          return fetchResponse()
    })

  if (isLoading) {
    return <div>Données en cours de chargement...</div>
  }
  if(data && data==='401'){
    return ( <>
        <Error message="unauthorized"/>
  </>)
  }

  if(error=== null && authUserOk){
        return (
            <>
            <Header/>
            <main className="main bg-dark">
                {(isSummaryVisible) ?
                    <div className="header">
                        <h1>Welcome back<br />{firstname} {lastname}!</h1>
                        <button className="edit-button" onClick={()=>{dispatch(setEditNameVisible(true))}}>Edit Name</button>
                        {isEditVisible && <EditName/>}
                    </div>:  
                    <div className="header">
                        {isChecking && <HeaderChecking/>}
                        {isSaving && <HeaderSaving />}
                        {isCredit && <HeaderCreditCard />}
                    </div>}
                {(isSummaryVisible)? <SummaryTransaction/> : <div className="transactions"><DetailTransaction/></div>}
            </main>
            </>
        )
    }else if(data && data==="Failed to fetch"){
    return ( <>
                  <Error message="networkFailed"/>
            </>)
}
}
export default Profile