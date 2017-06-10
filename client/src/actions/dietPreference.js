import axios from 'axios';

export const getDietPreference = () => {
  return (dispatch) => {
    axios.get('/api/dietPreferences')
        .then(function (res) {
        dispatch({ type: 'DIETPREFERENCE', dietPreference: res.data })
    })
        .catch(function (error) {
          console.log("ERROR")
        console.log(error);
    });
  }
}

const currentUser = (user = {}) => {
  return { type: 'USER', user }
}