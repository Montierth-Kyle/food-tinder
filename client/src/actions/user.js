import axios from 'axios';

export const logout = (history) => {
  return(dispatch) => {
    axios.delete('/api/auth/logout')
      .then( () => {
         dispatch(currentUser())
      })
      .catch( (err) => {
        console.log("ERROR");
        console.log(err);
      })
  }
}

const currentUser = (user = {}) => {
  return { type: 'USER', user }
}

export const createUser = (email, password, firstName, lastName, title, history) => {
  return (dispatch) => {
    let endpoint = title === 'Register' ? 'signup' : 'signin';
    axios.post(`/api/auth/${endpoint}`, { email, password, firstName, lastName })
     .then( user => {
       dispatch(currentUser(user.data))
       history.replace('/dashboard')
     })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      })
  }
}

export const authenticate = (email, password, title, history) => {
  return (dispatch) => {
    let endpoint = title === 'Register' ? 'signup' : 'signin';
    axios.post(`/api/auth/${endpoint}`, { email, password } )
      .then( user => {
       dispatch(currentUser(user.data))
       history.replace('/dashboard')
     })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      })
  }
}

export const tryFetchUser = (cb) => {
  return (dispatch) => {
    axios.get('/api/auth/user')
      .then( user => {
      dispatch(currentUser(user.data)) 
    })
      .then(() => cb())
  }
}