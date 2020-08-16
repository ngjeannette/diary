export const updateinfo = (info) => {
    return {
        type: 'UPDATE_USER',
        payload: info
    }
}
export const updatempty = (info) => {
    return {
        type: 'UPDATE_EMPTY',
        payload: info
    }
}
export const updatediaryinfo = (info) => {
    return {
        type: 'UPDATE_DIARY',
        payload: info
    }
}
export const updatediaryempty = (info) => {
    return {
        type: 'UPDATE_DIARY_EMPTY',
        payload: info
    }
}