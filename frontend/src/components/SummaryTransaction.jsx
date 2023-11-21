import { useDispatch } from "react-redux"
import { setSummaryVisible, setChecking, setSaving, setCredit } from "../features/store"
import HeaderChecking from "./headers/HeaderChecking"
import HeaderSaving from "./headers/HeaderSaving"
import HeaderCreditCard from "./headers/HeaderCreditCard"

function SummaryTransaction(){
    const dispatch = useDispatch()
    return(
        <>
         <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <HeaderChecking/>
                <div className="account-content-wrapper cta">
                <button className="transaction-button" onClick={()=>{dispatch(setSummaryVisible(false)); dispatch(setChecking(true))}}>View transactions</button>
                </div>
            </section>
            <section className="account">
                <HeaderSaving/>
                <div className="account-content-wrapper cta">
                <button className="transaction-button" onClick={()=>{dispatch(setSummaryVisible(false)); dispatch(setSaving(true))}}>View transactions</button>
                </div>
            </section>
            <section className="account">
                <HeaderCreditCard/>
                <div className="account-content-wrapper cta">
                <button className="transaction-button" onClick={()=>{dispatch(setSummaryVisible(false)); dispatch(setCredit(true))}}>View transactions</button>
                </div>
            </section>
        </>
    )
}

export default SummaryTransaction