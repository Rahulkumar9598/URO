import React, { useEffect } from 'react'
import data from '../assets/boysFashion.json'
import { FaHeart } from "react-icons/fa6";
import { useState } from 'react';

import axios from 'axios'
import api from '../services/endpoint.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increatement, decrement } from '../Store/CartSlice.js';
import { toggleLike } from '../Store/WishlistSlice.js';


const BoysFashion = () => {
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist)
    const cart = useSelector(state => state.cart)
    const user = useSelector(state =>state.user)
    


    useEffect(() => {
        console.log("this is current user ", user);

    }, [])


    useEffect(() => {
        console.log(wishlist, "this is wishlist")

    }, [wishlist])

    useEffect(() => {
        console.log(cart, "this is cart ")
    }, [cart])

    const handleLike = (product) => {
        console.log(product, "this is productId")
        dispatch(toggleLike(product))
    }

    const handleAddtoCart = (product) => {
        dispatch(addToCart([{ ...product, quantity: 1 }]))
    }

    const handleIncrementClick = (id) => {
        dispatch(increatement({ id }))
    }

    const handleDecrementClick = (id) => {
        dispatch(decrement({ id }))
    }



    return (
        <div className=' pt-40 pb-20 flex justify-center flex-wrap gap-5 bg-gray-50'>
            {
                data.map((value, index) => (
                    <ul key={index} className='bg-white p-3 shadow-lg h-120 shadow-black'>
                        <img src={value.image} className='h-90  w-full ' ></img>
                        <div className='flex justify-between'>
                            <div>
                                <li className='text-xl font-semibold'>{value.price}</li>
                                <li className='text-green-700 font-bold text-lg'>{value.discount_percent}</li>
                            </div>

                            <div className='p-5 flex  gap-3'>

                                <div >
                                    {wishlist.some((p) => p.id === value.id) ?
                                        <FaHeart onClick={() => handleLike(value)} style={{ color: "red" }} size={30} /> :
                                        <FaHeart onClick={() => handleLike(value)} size={30} className='  text-gray-300 ' />}



                                </div>
                                {!cart.some((product) => product.id === value.id) ?
                                    <button onClick={() => handleAddtoCart(value)} className='bg-red-400 p-2 w-full rounded text-white font-semibold '>Add to cart</button>
                                    :



                                    <button
                                        className='bg-red-400 p-2 rounded text-white font-semibold w-full flex'>

                                        <div className='flex'>
                                            {/* {user.role == "admin" &&(
                                                
                                            )} */}
                                            <p onClick={(e) => { handleDecrementClick(value.id) }} className='px-2'>-</p>
                                           

                                            <p className='px-3 text-white'>{cart.find(item => item.id === value.id)?.quantity || 0}</p>

                                            <p className='px-2' onClick={(e) => { handleIncrementClick(value.id) }}>+</p>

                                        </div>




                                    </button>
                                }

                            </div>

                        </div>
                    </ul>
                )

                )
            }
        </div>
    )
}

export default BoysFashion