import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../services/endpoint.js';
import { useDispatch, useSelector } from "react-redux";
import { setUserDetalis } from '../Store/userReducer.js';




const login = () => {

    const navigate = useNavigate();
    const [signin, setSignin] = useState(true)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    console.log(user , "  this is user of ghjkbnknbnmk")
    


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("BASE_URL =", import.meta.env.VITE_BACKEND_URL);

            const data = {
                name,
                email,
                password
            }
            console.log(data)
            const response = await axios.post(api.user.signup , data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(response.data , " this is reponse");
            // navigate("/")

            toast.success("Signup  successfully!")


        } catch (err) {
            console.log(err)

        }

    }

    const handleSubmitSignin = async (e) => {
        e.preventDefault();
        try {
            const signindata = {
                email,
                password

            }
            console.log(signindata)
            const res = await axios.post(api.user.signin,

                signindata, {
                headers: {
                    "Content-Type": "application/json"

                }
            });


          const token = localStorage.setItem("NGauth",  res.data.token)
            dispatch(setUserDetalis(res?.data?.user))
            console.log(res.data?.user?.email , "this is login response")
            toast.success("Signin successfully!")

            navigate("/" , {
                state:{
                    email:email
                }

            })


        } catch (err) {
            console.log(err)
            toast.error("please try again")
        }

    }
 useEffect(() => {
    console.log(user , "this is user ")
    if(user?.email){
      navigate("/")
    }
  },[])


    return (
        <div className=' w-full mx-auto  p-20 pt-50 rounded-2xl  flex flex-wrap justify-center bg-white-100'>
            {signin ?
                <div className=' signin bg-red-400 flex flex-wrap sm:w-[80%] rounded-l-2xl md:w-[40%] py-5 pb-25 '>
                    <div className=' flex justify-center flex-col flex-wrap w-full pb-20 p-5 '>
                        <h1 className='font-bold text-6xl flex flex-wrap text-white pt-30 mx-auto'>Welcome Back!</h1>
                        <p className='text-white    pt-4 mx-auto font-semibold text-lg'>To keep connect with us please login with us your personal info</p>
                        <button onClick={() => setSignin(false)} className='bg-transparent  rounded-3xl mx-auto border-gray-200 border-2 px-15 py-2 text-white font-semibold mt-8 '>Signin</button>
                    </div>
                </div>
                :
                <div className='bg-gray-200 md:w-[40%] sm:w-[80%] rounded-l-2xl py-5 pb-25 '>
                    <div className=' flex justify-center flex-col flex-wrap   w-full pb-15 p-5 '>
                        <h1 className='font-bold text-6xl  pt-20 mx-auto '>Sign in</h1>

                    </div>
                    <div >
                        <form onSubmit={(e) => handleSubmitSignin(e)}>
                            <div className='flex flex-wrap gap-5 w-[70%] mx-auto flex-col'>

                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Email' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />
                                <p className='mx-auto'>Forget your password ?</p>
                                <button className='bg-red-400 text-white mx-auto font-semibold px-2 py-2 rounded-2xl w-[30%]'>Sign IN</button>
                            </div>


                        </form>
                    </div>


                </div>


            }

            {signin ?
                <div className='bg-gray-200 md:w-[40%] sm:w-[80%] rounded-r-2xl  '>
                    <div className=' flex justify-center flex-col flex-wrap   w-full pb-5  '>
                        <h1 className='font-bold text-6xl  pt-20 mx-auto '>Create Account</h1>
                        <p className='mx-auto p-4'>Use your email for registration</p>
                    </div>
                    <div >
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className='flex flex-wrap gap-5 p-4 flex-col'>
                                <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder='Name' value={name} className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />

                                <input
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    type="email" name="email" placeholder='Email' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />

                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} placeholder='Password' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />
                                <button className='bg-red-400 text-white align-self-auto font-semibold px-2 py-3 rounded-2xl'>Signup</button>
                            </div>


                        </form>
                    </div>


                </div>
                : <div className=' signin bg-red-400  rounded-r-2xl md:w-[40%] sm:w-[80%]    py-5  '>
                    <div className=' flex justify-center flex-col flex-wrap w-full pb-20 p-5 '>
                        <h1 className='font-bold text-6xl  text-white pt-30 mx-auto'>Hello, Friend!</h1>
                        <p className='text-white    pt-4 mx-auto font-semibold text-lg'>Enter your personal deatails and start journey with us</p>
                        <button onClick={() => setSignin(true)} className='bg-transparent  rounded-3xl mx-auto border-gray-200 border-2 px-15 py-2 text-white font-semibold mt-8 '>SIGN UP</button>
                    </div>
                </div>

            }

        </div>
    )
}

export default login