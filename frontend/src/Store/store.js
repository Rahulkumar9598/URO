import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './wishlistSlice.js';
import cartReducer from './cartSlice.js';
import userReducer from "./userSlice.js"

 const store = configureStore({
  reducer: {
    cart:cartReducer,
    wishlist:wishlistReducer,
    user:userReducer
  },
})

export default store