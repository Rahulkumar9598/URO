import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    items:[
        {
            productId:String,
            
        },

         {
            quantity:Number,
            default:1,
         }
    ],
       
    
});
export const Cart = mongoose.model("Cart",cartSchema)