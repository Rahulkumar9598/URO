import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './wishlistSlice';
import cartReducer from './cartSlice'
import  userReducer  from './userReducer';

 const store = configureStore({
  reducer: {
    cart:cartReducer,
    wishlist:wishlistReducer,
    user:userReducer
  },
})

export default store