let initialState = []

export const wishlistReducer = (state = initialState, action) => {
    switch (action.type){
        case "ADD_TO_WISHLIST":
            return [...state, action.payload]
        case "REMOVE_FROM_WISHLIST":
            console.log(state)
            const index = state.findIndex(item => +item.id === +action.payload.id)
            console.log(index)
            return [...state.slice(0, index), ...state.slice(index+1)]
        case "UPDATE_WISHLIST":
            return action.payload
        default:
            return state
    }
}