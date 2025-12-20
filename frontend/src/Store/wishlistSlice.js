import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    toggleLike: (state, action) => {
      console.log(action.payload, "this is state")
      const isExist = state.some((product) => product.id === action.payload.id)
      console.log(isExist, "this is isExist")

      if(!isExist) {
        state.push(action.payload)
      } else {
        const index = state.findIndex((product) => product.id === action.payload.id)
        state.splice(index, 1)
      }
    }
  },

});

export const { toggleLike } = wishlistSlice.actions
export default wishlistSlice.reducer