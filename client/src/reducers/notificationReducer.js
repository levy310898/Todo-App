export const notificationReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_NOTIFICATION":
      return [...state, payload]
    case "REMOVE_NOTIFICATION":
      return state.filter(notification=>notification.id!== payload)

    default:
      return state
  }
}