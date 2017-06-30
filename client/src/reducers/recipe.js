const recipe = (state = [], action) => {
  switch(action.type) {
    case 'GETRECIPES':
      return action.recipes
    case 'GETONERECIPE':
      return action.recipes
    case 'DELETERECIPE':
      return state.filter(recipe => recipe._id !== action.id)
    default:
      return state;
  }
}

export default recipe;