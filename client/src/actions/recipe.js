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
      .then( (res) => {
        dispatch({ type: 'GETONERECIPE', recipes: res.data })
      })
      .catch(function (err) {
        console.log("ERROR")
        console.log(err.response);
      });
  }
}

export const deleteRecipe = (recipe) => {
  console.log(recipe);
  return(dispatch) => {
    axios.delete(`/api/recipes/deleteRecipe/${recipe._id}`)
      .then( () => {
        dispatch({ type: 'DELETERECIPE', id: recipe._id})
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