import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './WishlistSlice';
import cartReducer from './CartSlice'
import  userReducer  from './userReducer';

 const store = configureStore({
  reducer: {
    cart:cartReducer,
    wishlist:wishlistReducer,
    user:userReducer
  },
})

export default store