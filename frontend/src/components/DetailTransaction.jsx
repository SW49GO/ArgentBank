import { accounts } from '../dataMocked/account'
import { useSelector } from 'react-redux'
import { selectChecking, selectCredit, selectSaving } from '../features/selectors'
import { useState } from 'react'

function DetailTransaction(){
    const saving = useSelector(selectSaving)
    const checking = useSelector(selectChecking)
    const creditCard = useSelector(selectCredit)

    function formatDate(inputDate) {
        const options = { month: 'long', day: 'numeric', year: 'numeric' }
        const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options)
        return formattedDate.replace(/\d+/, (day) => `${day}th`)
      }

    const [openTransactionId, setOpenTransactionId] = useState(null)
    let transactions = [];

    if (saving) {
      transactions = accounts.savings;
    } else if (checking) {
      transactions = accounts.checkings;
    } else if (creditCard) {
      transactions = accounts.creditCards;
    }
  
    if (transactions.length === 0) {
      return null
    }

    const handleToggle = (transactionId) => {
        setOpenTransactionId((prevId) => (prevId === transactionId ? null : transactionId));
      }

    return (
        <>
        <h2 className="sr-only">Transactions</h2>
        <section className="account account-table">
            <table>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>DESCRIPTION</th>
                        <th>AMOUNT</th>
                        <th>BALANCE</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                    <>
                        <tr key={transaction.id}>
                            <td>
                                <i
                                className={`chevron fa fa-angle-${openTransactionId === transaction.id ? 'up' : 'down'}`}
                                onClick={() => handleToggle(transaction.id)}
                                ></i>
                                {formatDate(transaction.createdAt)}
                            </td>
                            <td>{transaction.description}</td>
                            <td>${transaction.amount}</td>
                            <td>${transaction.balance}</td>
                        </tr>
                        {openTransactionId === transaction.id && (
                        <tr className="demo-transaction">
                            <td colSpan="4">
                                <p>Transaction Type:Electronic</p>
                                <form>
                                    <div>
                                        <label htmlFor={`editCategory-${transaction.id}`}>Category:</label>
                                        <input
                                        type="text"
                                        id={`editCategory-${transaction.id}`}
                                        name="category"
                                        required
                                        value={transaction.category}
                                        />
                                        <i className="fa fa-pencil"></i>
                                    </div>
                                    <div>
                                        <label htmlFor={`editNotes-${transaction.id}`}>Notes:</label>
                                        <input
                                        type="text"
                                        id={`editNotes-${transaction.id}`}
                                        name="notes"
                                        required
                                        value={transaction.notes}
                                        />
                                        <i className="fa fa-pencil"></i>
                                    </div>
                                </form>
                            </td>
                        </tr>
                        )}
                    </>
                    ))}
                </tbody>
            </table>
        </section>
    </>
    )
}


export default DetailTransaction