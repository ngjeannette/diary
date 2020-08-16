const loginInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_USER":
            return action.payload
        case "UPDATE_EMPTY":
            return {};
        default:
            return state
    }
}
export default loginInfoReducer;