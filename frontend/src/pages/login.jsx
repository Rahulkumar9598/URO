// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import api from '../services/endpoint.js';
// import { useDispatch, useSelector } from "react-redux";
// import { setUserDetalis } from '../Store/userReducer.js';




// const login = () => {

//     const navigate = useNavigate();
//     const [signin, setSignin] = useState(true)

//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const dispatch = useDispatch()

//     const user = useSelector(state => state.user)


//     console.log(user, "  this is user of ghjkbnknbnmk")



//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             console.log("BASE_URL =", import.meta.env.VITE_BACKEND_URL);

//             const data = {
//                 name,
//                 email,
//                 password
//             }

//             const response = await axios.post(api.user.signup, data, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             console.log(response.data, " this is reponse");
//             // navigate("/")
//             if (response.data.success) {
//                 console.log("this is signup resposne")
//                 toast.success("Signup  successfully!")

//             }



//         } catch (err) {
//           toast.error(err?.response?.data?.message || "Something went wrong");

//         }

//     }

//     const handleSubmitSignin = async (e) => {
//         e.preventDefault();
//         try {
//             const signindata = {
//                 email,
//                 password

//             }
//             console.log(signindata)
//             const res = await axios.post(api.user.signin,

//                 signindata, {
//                 headers: {
//                     "Content-Type": "application/json"

//                 }
//             });

//             const token = localStorage.setItem("NGauth", res.data.token)
//             dispatch(setUserDetalis(res?.data?.user))
//             console.log(res.data?.user?.email, "this is login response")

//             if (res.data.success) {

//                 toast.success("Signin successfully!")
//                 navigate("/", {
//                     state: {
//                         email: email
//                     }

//                 })

//             }

//         } catch (err) {
//             console.log("this is error response",err)
//          toast.error(err?.response?.data?.message || "Something went wrong");
//         }

//     }


//     useEffect(() => {
//         console.log(user, "this is user ")
//         if (user?.email) {
//             navigate("/")
//         }
//     }, [user])


//     return (
//         <div className=' w-full mx-auto  p-20 pt-50 rounded-2xl  flex flex-wrap justify-center bg-white-100'>
//             {signin ?
//                 <div className=' signin bg-red-400 flex flex-wrap sm:w-[80%] rounded-l-2xl md:w-[40%] py-5 pb-25 '>
//                     <div className=' flex justify-center flex-col flex-wrap w-full pb-20 p-5 '>
//                         <h1 className='font-bold text-6xl flex flex-wrap text-white pt-30 mx-auto'>Welcome Back!</h1>
//                         <p className='text-white    pt-4 mx-auto font-semibold text-lg'>To keep connect with us please login with us your personal info</p>
//                         <button onClick={() => setSignin(false)} className='bg-transparent  rounded-3xl mx-auto border-gray-200 border-2 px-15 py-2 text-white font-semibold mt-8 '>Signin</button>
//                     </div>
//                 </div>
//                 :
//                 <div className='bg-gray-200 md:w-[40%] sm:w-[80%] rounded-l-2xl py-5 pb-25 '>
//                     <div className=' flex justify-center flex-col flex-wrap   w-full pb-15 p-5 '>
//                         <h1 className='font-bold text-6xl  pt-20 mx-auto '>Sign in</h1>

//                     </div>
//                     <div >
//                         <form onSubmit={(e) => handleSubmitSignin(e)}>
//                             <div className='flex flex-wrap gap-5 w-[70%] mx-auto flex-col'>

//                                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder='Email' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />
//                                 <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />
//                                 <p className='mx-auto'>Forget your password ?</p>
//                                 <button className='bg-red-400 text-white mx-auto font-semibold px-2 py-2 rounded-2xl w-[30%]'>Sign IN</button>
//                             </div>


//                         </form>
//                     </div>


//                 </div>


//             }

//             {signin ?
//                 <div className='bg-gray-200 md:w-[40%] sm:w-[80%] rounded-r-2xl  '>
//                     <div className=' flex justify-center flex-col flex-wrap   w-full pb-5  '>
//                         <h1 className='font-bold text-6xl  pt-20 mx-auto '>Create Account</h1>
//                         <p className='mx-auto p-4'>Use your email for registration</p>
//                     </div>
//                     <div >
//                         <form onSubmit={(e) => handleSubmit(e)}>
//                             <div className='flex flex-wrap gap-5 p-4 flex-col'>
//                                 <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder='Name' value={name} className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />

//                                 <input
//                                     value={email} onChange={(e) => setEmail(e.target.value)}
//                                     type="email" name="email" placeholder='Email' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />

//                                 <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" value={password} placeholder='Password' className='bg-white border-gray-300 border-1 p-4 py-2 rounded-xl w-[100%]' />
//                                 <button className='bg-red-400 text-white align-self-auto font-semibold px-2 py-3 rounded-2xl'>Signup</button>
//                             </div>


//                         </form>
//                     </div>


//                 </div>
//                 : <div className=' signin bg-red-400  rounded-r-2xl md:w-[40%] sm:w-[80%]    py-5  '>
//                     <div className=' flex justify-center flex-col flex-wrap w-full pb-20 p-5 '>
//                         <h1 className='font-bold text-6xl  text-white pt-30 mx-auto'>Hello, Friend!</h1>
//                         <p className='text-white    pt-4 mx-auto font-semibold text-lg'>Enter your personal deatails and start journey with us</p>
//                         <button onClick={() => setSignin(true)} className='bg-transparent  rounded-3xl mx-auto border-gray-200 border-2 px-15 py-2 text-white font-semibold mt-8 '>SIGN UP</button>
//                     </div>
//                 </div>

//             }

//         </div>
//     )
// }

// export default login

import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../services/endpoint.js';
import { useDispatch, useSelector } from "react-redux";
import { setUserDetalis } from '../Store/UserSlice.js';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();
    const [signin, setSignin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user)
    const currentuser = JSON.parse(localStorage.getItem("user"))

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = { name, email, password }
            const response = await axios.post(api.user.signup, data

            );

            if (response.data.success) {
                toast.success("Signup successfully!");
                setSignin(true); // Switch to signin after successful signup
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmitSignin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const signindata = { email, password }
            const res = await axios.post(api.user.signin, signindata

            );

            localStorage.setItem("NGauth", res.data.token)
            dispatch(setUserDetalis(res?.data?.user))

            if (res.data.success) {
                toast.success("Signin successfully!")
                navigate("/")
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }


    
    //google login

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "443493828864-u2snfd26ahnvraavv5ufu768nv8om0i0.apps.googleusercontent.com",
            callback: handleCredentialLogin,
        });


        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large" }
        );

    }, []);

    const handleCredentialLogin = async (response) => {
        console.log(response.credential , " this  is my creadentail okkk")

        try {
            if (response?.credential) {
                const token = response.credential
                localStorage.setItem("googleLoginAuth", token)

                const res = await axios.post(api.user.googlelogin, { token })
                console.log(res, " this is googlelogin response")


                if (res.data.success) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    dispatch(setUserDetalis(res?.data?.user))
                      navigate("/")
                }

            }

           

        } catch (error) {
            toast.error(error?.response?.data?.message)

        }


    }
          //googlelogin//


    // useEffect(() => {
    //     if (currentuser?.email) {
    //         navigate("/")
    //     }
    // }, [currentuser])


    return (
        <div className='min-h-[85vh] mt-25 flex items-center justify-center p-4 bg-gradient-to-b from-[#fff8f0] via-[#fff5eb] to-[#fff0e6]'>
            <div className='w-full max-w-4xl mx-auto'>
                <div className='flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-xl'>
                    {/* Left Panel - Branding */}
                    <div className='lg:w-2/5 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-[#ff6b6b] to-[#ff8e53] text-white'>
                        <div className='text-center'>
                            <h1 className='text-2xl md:text-3xl font-bold mb-4'>
                                {signin ? 'Welcome Back!' : 'Hello, Friend!'}
                            </h1>
                            <p className='text-white/90 mb-6 text-sm md:text-base'>
                                {signin
                                    ? 'Sign in to continue your journey with us'
                                    : 'Enter your personal details and start journey with us'
                                }
                            </p>
                            <button
                                onClick={() => setSignin(!signin)}
                                className='border border-white/50 hover:bg-white/10 rounded-full px-6 py-2 text-sm transition-colors'
                            >
                                {signin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Form */}
                    <div className='lg:w-3/5 bg-white p-6 md:p-8'>
                        <div className='mb-6'>
                            <h2 className='text-2xl font-bold text-gray-800 text-center mb-2'>
                                {signin ? 'Sign In' : 'Create Account'}
                            </h2>
                            <p className='text-gray-600 text-center text-sm'>
                                {signin ? 'Enter your credentials' : 'Fill in your details'}
                            </p>
                        </div>

                        <form onSubmit={signin ? handleSubmitSignin : handleSubmit} className='space-y-4'>
                            {!signin && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#ff8e53] focus:ring-1 focus:ring-[#ff8e53]/20 outline-none transition"
                                        required={!signin}
                                        disabled={isLoading}
                                    />
                                </div>
                            )}

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#ff8e53] focus:ring-1 focus:ring-[#ff8e53]/20 outline-none transition"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#ff8e53] focus:ring-1 focus:ring-[#ff8e53]/20 outline-none transition pr-10"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {signin && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-[#ff6b6b] hover:text-[#ff8e53]"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-lg font-medium text-white transition ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] hover:opacity-90'
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    signin ? 'Sign In' : 'Sign Up'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Button - Only button with placeholder function */}
                            <div id="googleSignInButton"></div>

                            <div className="text-center mt-4">
                                <p className="text-xs text-gray-500">
                                    By continuing, you agree to our{' '}
                                    <a href="#" className="text-[#ff6b6b] hover:underline">Terms</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-[#ff6b6b] hover:underline">Privacy Policy</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login