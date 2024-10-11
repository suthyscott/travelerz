let initialState = {
    userId: null,
    username: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            let newState = {
                userId: action.payload.userId,
                username: action.payload.username
            }
            return newState
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}