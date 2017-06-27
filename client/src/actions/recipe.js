import axios from 'axios';

export const getRecipes = () => {
  return (dispatch) => {
    axios.get('/api/recipes/')
        .then( (res) => {
        dispatch({ type: 'GETRECIPES', recipes: res.data })
    })
        .catch(function (err) {
          console.log("ERROR")
          console.log(err.response);
    });
  }
}

export const getOneRecipe = (id) => {
  return (dispatch) => {
    axios.get(`/api/recipes/${id}`)
      .then((res) => {
        dispatch({ type: 'GETONERECIPE', recipes: res.data })
      })
      .catch(function (err) {
        console.log("ERROR")
        console.log(err.response);
      });
  }
}

export const tryGetUserRecipes = (cb) => {
  return (dispatch) => {
    axios.get('/api/recipes')
  }
}