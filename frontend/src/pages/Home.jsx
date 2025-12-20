import React from 'react'
import varaity from "../assets/varaity.json"
import card from "../assets/card.json"
import girlwardrope from "../assets/girlwardrope.json"
import { Link, useLocation } from 'react-router-dom'
import { IoArrowForward } from "react-icons/io5";
import { useState } from 'react';
import { useEffect } from 'react';
import Marquee from "react-fast-marquee";
import api from '../services/endpoint'
import axios from "axios"
import Navbar from '../components/Navbar'


const Home = () => {

    const images = [
   "https://cdn.fcglcdn.com/brainbees/banners/hp_mktg_p01_flash_10_big_desktop1760785788353.webp",
    "https://cdn.fcglcdn.com/brainbees/banners/hp_mktg_p01_prim_6_flat4542_desktop1760785396396.webp",
    "https://cdn.fcglcdn.com/brainbees/banners/mktng_nonapps_base_nursery_hp_26october25_au1760696702924.webp",
  ];


   const [current, setCurrent] = useState(0);
   const [email ,setEmail] = useState()
   const location = useLocation()


useEffect(()=>{
  setEmail(location?.state?.email)
  // console.log(location?.state?.email , "this is user email")


},[location])

// console.log(email)

const handleGetDetails = async()=>{
  const token = localStorage.getItem("NGauth")
  console.log("this is token ",token)

  const res= await axios.post(api.user.handleGetDetails ,{token})
  console.log(res ," this is user details ok ")

}

useEffect(()=>{
  handleGetDetails()

},[])
 


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // har 3 second slide
    return () => clearInterval(interval);
  }, []);


    return (
        <>
     <Marquee pauseOnHover={true} gradient={false} speed={60}>
            <div className=' flex flex-wrap gap-1 pt-15  md:mt-20 w-[100%]  text-center'>
                        {varaity.map((value, index) => (


                            <ul className=' text-sm gap-2'>
                                <span>
                                    <img src={value.image} key={index} className=' object-fill  ' style={{ width: "150px", height: "150px" }} />
                                    {/* <li key={index}>{value.title }</li>
                        <li key={index}>{value.price }</li> <br /> */}

                                </span>


                            </ul>


                        )


                        )

                        }
                    </div>
                    </Marquee>

        {/* slider */}
   <div className="w-[90%] flex justify-self-center overflow-hidden mt-5  h-[150px] md:h-[400px] relative">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.concat(images[0]).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className="w-full flex-shrink-0 object-cover h-[400px] md:h-[600px]"
          />
        ))}
      </div>
    </div>

        {/* image */}
            <div className='flex pt-2 mx-auto w-full justify-center '>
                <div className='flex  w-[50%]  flex-col flex-wrap text-5xl  p-4'>
                    <div className='text-xl sm:text-2xl md:text-3xl  w-full text-center'>What are you looking for? </div>
               
                    <div className=' flex flex-wrap gap-1 pt-15  mt-4 w-[100%]  text-center'>
                        {varaity.slice(0, 4).map((value, index) => (


                            <ul className=' text-sm gap-2'>
                                <span>
                                    <img src={value.image} key={index} className=' object-fill  ' style={{ width: "150px", height: "150px" }} />
                                    {/* <li key={index}>{value.title }</li>
                        <li key={index}>{value.price }</li> <br /> */}

                                </span>


                            </ul>


                        )


                        )

                        }
                    </div>
                   

                    <div className='p-4 '>
                        <h1 className='text-4xl text-center text-gray-400 pt-10'>Girl's Wordrope</h1>
                      <div className='flex flex-wrap  pt-10'>
                          {girlwardrope.map((value ,idx)=>(
                            <ul>
                              <img src={value.image} alt="" key={idx} style={{ width: "150px", height: "150px" }}/>
                            </ul>
                        ))}
                      </div>
                      <div className='pt-15 w-full'>
                        <img src="https://static.hopscotch.in/fstatic/boutique/banner/202509/2956fe38-adf2-4b37-9a06-355107239a3e_full.jpg?version=1757562470992&tr=f-webp,w-480,c-at_max,n-normal" alt="" style={{width:"100%"}} />
                    </div>
                       

                    </div>

                </div>

{/* //second */}
                <div className='   text-gray-700 w-[60%]' >
                    {/* <div className='bg-orange-300 rounded-sm text-white'>
                        <marquee behavior=" " direction="">
                            <h1 className=' text-xl sm:text-2xl md:text-3xl  z-0' >BIG DIWALI SALE <span>START AT MIDNIGHT</span></h1>
                        </marquee>

                    </div> */}


                    <div >
                        <h1 className='text-xl sm:text-2xl md:text-3xl text-gray-400 text-center pb-10 pt-5'> On Everyone's Style Radar</h1>
                        <div className='flex flex-wrap gap-3 justify-center '>
                            {card.map((value ,idx)=>(
                            <ul >
                                <img src={value.image} key={idx} style={{ width: "300px", height: "400px" }}/>
                            </ul>
                        
                        ))}

                        </div>
                        

                    </div>

                    <div className='w-full'>
                         <h1 className='text-5xl text-center text-gray-400 pt-15'>Gifting Corner</h1>
                         <img src="https://static.hopscotch.in/fstatic/boutique/banner/202510/d5a52d3d-5c44-4c64-81db-0a5df7a0810a_full.jpg?version=1759493926623&tr=f-webp,w-480,c-at_max,n-normal" alt="" style={{width:"80%"} } className=' flex justify-self-center pt-8' />
                    </div>
                    
                </div>

            </div>
            <a href="#" className='border-2 rounded-md p-1 flex justify-self-end m-3 bg-violet-100'>Back to home <IoArrowForward size={30} />
 </a>

        </>

    )
}

export default Home