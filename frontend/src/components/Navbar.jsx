import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import Navbar2 from './Navbar2';
import { User } from '../../../backend/models/user.models';
import { useSelector } from 'react-redux';


const Navbar = () => {
  // const user = JSON.parse(localStorage.getItem("googleLoginUser"));
  
  const [user , setUser] = useState(localStorage.getItem("user"))
  const updatedUser = useSelector(state => state.user)

  useEffect(() => {
    console.log(updatedUser , "this is user")
    setUser(updatedUser)
  },[updatedUser])


  
  return (
    

    <>
    <div className='bg-red-400 w-full   px-8 py-3 text-white font-semibold text-lg flex justify-between gap-8 sm:gap-20 z-10' style={{position:"fixed" , top:0,left:0}}>
        <div className=''>
        <Link to="/"> <h1 className='text-2xl'><i>URO</i> </h1> </Link> 
        </div>
        <ul className='flex flex-wrap justify-center items-center gap-4 sm:gap-8 '>
              
            <Link to="/location" className=' gap-1 hidden sm:block'><IoLocationOutline size={30} />Select Location</Link>
            <li><IoSearchOutline size={30} /></li>
            <li><CiHeart size={30}/></li>
          
           <Link  to="/login" className='flex gap-1' >  <p className='pt-2'>{user?.name}</p><img src={user?.avatar} alt="fghj"  className='rounded-full h-13 w-13'/> </Link>
            <Link to="/cart"><IoCartOutline size={30} /></Link>

        </ul>
    </div>
    <Navbar2/>
    </>
  )
}

export default Navbar
