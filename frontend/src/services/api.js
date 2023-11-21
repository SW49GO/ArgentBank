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