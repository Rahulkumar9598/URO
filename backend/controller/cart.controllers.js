import express from 'express'
import mongoose  from 'mongoose';
import {Cart} from '../models/cart.models.js'

// export const handleCart = async(req,res)=>{
//     try{
//         console.log(req.body)
//         const {userId ,productId ,quantity}=req.body;
//          const qty = parseInt(quantity) || 1;
//         let cart = await Cart.findOne({userId}) 

//         if(!cart){
//                cart = new Cart({
//                userId,
//                items:[]

//         });
//         }
//         const item =  cart.items.find((item)=>
//            item.productId.toString() === productId,
//         );
//         if(item){
//             item.quantity += qty;
//         }
//         else{
//             cart.items.push({
//                 productId,
//                 quantity: qty,
//             });
//         }
//         await cart.save();
//         res.json({
//             message:"Added to cart",
//             cart
//         })
//     }catch(err){
//         console.log(err);
//     }
// }
export const handleCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const qty = parseInt(quantity) || 1;

        // 1) user ka cart find karo
        let cart = await Cart.findOne({ userId });

        // 2) agar cart nahi mila → new cart banao
        if (!cart) {
            cart = new Cart({
                userId,
                items: []   // <-- sahi field
            });
        }

        // 3) check karo item already exist karta hai?
        const item = cart.items.find(
            (item) => item.productId.toString() === productId.toString()
        );

        // 4) exists → quantity badhao
        if (item) {
            item.quantity += qty;
        } 
        else {
            // 5) new item add
            cart.items.push({
                productId,
                quantity: qty
            });
        }

        await cart.save();

        res.json({
            message: "Added to cart",
            cart
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
