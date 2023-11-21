import { selectFirstname, selectEditName, selectLastname, selectSummary, selectChecking, selectSaving, selectCredit, selectAuth } from '../features/selectors'
import HeaderCreditCard from '../components/headers/HeaderCreditCard'
import SummaryTransaction from '../components/SummaryTransaction'
import HeaderChecking from '../components/headers/HeaderChecking'
import HeaderSaving from '../components/headers/HeaderSaving'
import { useDispatch, useSelector } from 'react-redux'
import { setEditNameVisible } from '../features/store'
import DetailTransaction from '../components/DetailTransaction'
import EditName from '../components/EditName'
import Header from '../components/Header'
import '../styles/main.css'
import { useQuery } from 'react-query'
import { authUser } from '../middlewares/authUser'
import { useNavigate } from 'react-router-dom'
import { setIsAuthUser } from '../features/store'




/**
 * Function to display summary account when user authentified
 * @returns {JSX.Element}
 */
function Profile(){

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const firstname= useSelector(selectFirstname)
    const lastname = useSelector(selectLastname)
    const isEditVisible = useSelector(selectEditName)
    const isSummaryVisible = useSelector(selectSummary)
    const isChecking = useSelector(selectChecking)
    const isSaving = useSelector(selectSaving)
    const isCredit = useSelector(selectCredit)
    const authUserOk = useSelector(selectAuth)

    const {data, error, isLoading } = useQuery('authUser', async () => {
        const response =  await dispatch(authUser())
        console.log('responseQUERY:', response.type)
  })

if(data){
    console.log(data)
}

    if(authUserOk){
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
    }
}
export default Profile