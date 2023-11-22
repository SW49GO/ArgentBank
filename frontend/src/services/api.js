/**
 * Function to login user and retrieve the authentication token
 * @param {object} data 
 * @returns {Promise<object>} - A promise that resolves with the data object if the query succeeds
 * @throws {string} - Message error '400' if the query returns a 400 Bad request
 */
export async function fetchData(data) {
    if (!data) {
      return 'Missing data'
    }
    const email = data.email
    const password = data.password
    try{
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password }),
      })
        if(response.ok){
          const data = await response.json()
          return data
        }else if(response.status===400){
          throw new Error('400')
        }
    }catch(error){
      //  console.error('Error:', error)
       return Promise.reject(error)
    }
}

/**
 * Function to retrieve user data if token is authentified
 * @param {object} data 
 * @returns {Promise<object>} - A promise that resolves with the data object if the query succeeds
 * @throws {string} - Message error '401' if the query returns a 401 Unauthorized
 */
export async function fetchUserData(data){
    if (!data) {
      return 'Missing data'
    }
      const token = data.token
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if(response.ok){
          const data = await response.json()
          return data
        }else if(response.status===401){
          throw new Error('401')
        }
      } catch (error) {
        // console.error('Error:', error)
        return Promise.reject(error)
      }
  }

  /**
   * Function to update firstname and/or lastname in BDD
   * @param {object} data 
   * @returns {Promise<object>} - A promise that resolves with the updated data object if the query succeeds
   * @throws {string} - Error message 'HTTP error' if the query returns an error code
   */
  export async function fetchUpdateData(data){
    if (!data) {
      return 'Missing data'
    }
    console.log('dataFETCHUSER:', data)
    const token = data.token
    const firstName = data.firstname
    const lastName = data.lastname
      try {
        console.log('API-LANCE')
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({firstName, lastName }),
        })
  
        if(response.ok){
          const data = await response.json()
          console.log('dataASAVE:', data)
          return data
        }
        return Promise.reject('HTTP error')
      } catch (error) {
        // console.error('Error:', error)
        return Promise.reject(error)
      }
  }