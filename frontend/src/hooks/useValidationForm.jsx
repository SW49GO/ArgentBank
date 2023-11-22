import validator from 'validator'
import DOMPurify from 'dompurify' 
/**
 * Function to check the validity of information before sending to requests
 * @param {object} data 
 * @returns {boolean or string}
 */
export function useValidationForm(data){
    // Checking the correct email format
    if(data.email && !validator.isEmail(data.email)){
        return 'bad email'
    }
    if(data.password){
        // Checking if password contains dangerous code injections and no space
        const verifPass = DOMPurify.sanitize(data.password)
        const withoutSpacePass = verifPass.replace(/\s/g, '')
        if(withoutSpacePass.length !== data.password.length || data.password.length<3){
            return 'invalid pass'
        }
    }
    if(data.firstname && data.lastname){
        // Checking if firstname and lastname contains dangerous code injections and no space
        const verifFirst =  DOMPurify.sanitize(data.firstname)
        const withoutSpaceFirst = verifFirst.replace(/\s/g, '')
        const verifLast = DOMPurify.sanitize(data.lastname)
        const withoutSpaceLast = verifLast.replace(/\s/g, '')
        if(withoutSpaceFirst.length !== data.firstname.length || withoutSpaceLast.length !== data.lastname.length || data.firstname ==='' || data.lastname ===''){
            return 'invalid data'
        }
    }
    return true
}