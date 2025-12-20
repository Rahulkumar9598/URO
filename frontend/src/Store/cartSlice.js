import { createSlice } from '@reduxjs/toolkit'
export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
    
        addToCart: (state, action) => {
            //   console.log(action.payload)
            const Exist = state.some((product) => product.id === action.payload.id)
            console.log("this cart is exist", Exist)

            if (!Exist) {
                state.push(...action.payload)

            } else {
                const index = state.findIndex((product) => product.id === action.payload.id)
                state.splice(index, 1)
            }
        },


        increatement: (state, action) => {
            console.log("this is action of increment", action.payload.id)

            const index = state.findIndex(value => value.id === action.payload.id)

            const data = state;
            data[index].quantity = data[index].quantity + 1

            return data

        },
        decrement: (state, action) => {
            const index = state.findIndex(value => value.id === action.payload.id)
            const data = state;
            if (data[index].quantity > 1) {
                data[index].quantity = data[index].quantity - 1


            }


        }

    }



}
)
export const { addToCart, increatement, decrement } = cartSlice.actions
export default cartSlice.reducer