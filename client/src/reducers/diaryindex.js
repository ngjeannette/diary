const diaryIndexReducer = (state = 0, action) => {
    switch (action.type) {
        case "UPDATE_DIARY_INDEX":
            return action.payload
        default:
            return state
    }
}
export default diaryIndexReducer;