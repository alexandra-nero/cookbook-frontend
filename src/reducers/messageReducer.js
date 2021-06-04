export const messageReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "CREATE_SUCCESS":
      return {
        ...state,
        header: 'Success!',
        messageContent: `Recipe, "${payload.recipeName}", has been created`
      }
    case "EDIT_SUCCESS":
      return {
        ...state,
        header: 'Success!',
        messageContent: `Recipe, "${payload.recipeName}", has been edited`
      }
    case "DELETE_SUCCESS":
      return {
        ...state,
        header: 'Success!',
        messageContent: `Recipe, "${payload.recipeName}", has been deleted`
      }
    case "CREATE_FAILURE":
      return {
        ...state,
        header: 'Error',
        messageContent: `There was an error in creating a new recipe`
      }
    case "EDIT_FAILURE":
      return {
        ...state,
        header: 'Error',
        messageContent: `There was an error in editing a new recipe`
      }
    case "DELETE_FAILURE":
      return {
        ...state,
        header: 'Error!',
        messageContent: `There was an error in deleting a new recipe`
      }
    case "CLEAR_MESSAGE":
      return {};
    default:
      return state;
  }
}