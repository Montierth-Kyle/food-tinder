import axios from 'axios';

export const getDietPreference = () => {
  return (dispatch) => {
    axios.get('/api/dietPreferences')
      .then( (res) => {
      dispatch({ type: 'DIETPREFERENCE', dietPreference: res.data })
    })
      .catch(function (err) {
      console.log("ERROR")
      console.log(err.response);
    });
  }
};

export const setDietPreference = id => {
  return dispatch => {
    dispatch({ type: 'SETDIETPREFERENCE', id })
  }
}