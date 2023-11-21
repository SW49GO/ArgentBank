import validator from 'validator'
import DOMPurify from 'dompurify' 

export function useValidationForm(data){
    // Vérif email
    if(data.email && !validator.isEmail(data.email)){
        return 'bad email'
    }
    if(data.password){
        // Vérif si password ne contient des injections de code dangereux
        const verifPass = DOMPurify.sanitize(data.password)
        const withoutSpacePass = verifPass.replace(/\s/g, '')
        if(withoutSpacePass.length !== data.password.length || data.password.length<3){
            return 'invalid pass'
        }
    }
    return true
}