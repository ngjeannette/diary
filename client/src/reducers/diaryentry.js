const diaryEntryReducer = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_DIARY":
            return action.payload
        case "UPDATE_DIARY_EMPTY":
            return null;
        default:
            return state
    }
}
export default diaryEntryReducer;