import { setSummaryVisible, setChecking, setSaving, setCredit } from "../features/store"
import HeaderCreditCard from "./headers/HeaderCreditCard"
import HeaderChecking from "./headers/HeaderChecking"
import HeaderSaving from "./headers/HeaderSaving"
import { useDispatch } from "react-redux"

/**
 * Function component to display the summary of all 3 accounts transaction
 * @returns {JSX.Element}
 */
function SummaryTransaction(){
    const dispatch = useDispatch()
    return(
        <>
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