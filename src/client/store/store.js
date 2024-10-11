import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authReducer.js"
import { wishlistReducer } from "./wishlistReducer.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        wishlist: wishlistReducer
    }
})

export default store