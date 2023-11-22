import { selectAuth, selectEditName, selectFirstname, selectLastname } from '../features/selectors'
import { setEditNameVisible, setInfosUser } from '../features/store'
import { useValidationForm } from '../hooks/useValidationForm'
import { useQuery, useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUpdateData } from '../services/api'
import { useForm } from 'react-hook-form'
import { useState } from 'react'


/**
 * Function component to display Form for editing user's Firstname/Lastname
 * @returns {JSX.Element}
 */
function EditName(){
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const isVisible = useSelector(selectEditName)
    const firstname = useSelector(selectFirstname)
    const lastname = useSelector(selectLastname)


    const token = sessionStorage.getItem('JWT')
    const {register, handleSubmit} = useForm()
    const [isValideForm, setIsValideForm] = useState(false)
    const verifyAuthUser = useSelector(selectAuth)

    // Request sent if form and user is valid
    const {error, isError} = useQuery('updateIdentity', () => { 
        fetchUpdateData({ firstname:firstname, lastname:lastname, token: token })
        },
        { enabled:isValideForm && verifyAuthUser,
        retry:1,
        onSuccess: () => {dispatch(setEditNameVisible(false)); dispatch(setInfosUser({ firstname:firstname, lastname:lastname}))},
        onError: () => {setIsValideForm(false)}
    })

    // Function to check the validity of fields and update Redux state
    const ChangeIdentity = (data)=>{
    const {firstname, lastname} = data
    const verifData = useValidationForm({firstname:firstname, lastname:lastname})
        if(verifData===true){
            dispatch(setInfosUser({firstname:firstname, lastname:lastname}))
            setIsValideForm(true)
            queryClient.invalidateQueries('updateIdentity')
        }
    }

if(isVisible===true && !error && !isError){
        return(
            <>
            <div className="edit-container">
                <form onSubmit={handleSubmit(ChangeIdentity)}>
                    <div className='edit-container-identity'>
                        <label htmlFor="editFirstname"></label>
                        <input type="txt" id="editFirstname" name="firstname" required
                            placeholder={firstname}
                            defaultValue={firstname}
                            {...register('firstname')} />
                        <label htmlFor="editLastname"></label>
                        <input type="txt" id="editLastname" name="lastname" required
                            placeholder={lastname}
                            defaultValue={lastname}
                            {...register('lastname')} />
                    </div>
                    <div className='edit-container-buttons'>
                        <button type="submit" className="edit-button-identity">Save</button>
                        <button type="button" className="edit-button-identity" onClick={()=>{ dispatch(setEditNameVisible(false))}}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
        )
    }
 }

export default EditName
