import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './WishlistSlice.js';
import cartReducer from './CartSlice.js';
import userReducer from "./UserSlice.js"

 const store = configureStore({
  reducer: {
    cart:cartReducer,
    wishlist:wishlistReducer,
    user:userReducer
  },
})

export default store