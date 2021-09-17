export const projectReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "PROJECT_LOAD_SUCCESS":
      return {
        ...state,
        project: payload,
        loading:false
      }
    
    case "CHANGE_SUCCESS":
      return {
        ...state,
        loading:true,
      }

    default:
      return state
  }
}