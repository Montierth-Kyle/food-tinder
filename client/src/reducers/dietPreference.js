const dietPreference = (state = [], action) => {
  switch(action.type) {
    case 'DIETPREFERENCE':
      return action.dietPreference
    default:
      return state;
  }
}

export default dietPreference;