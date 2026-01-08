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

// const handleGetDetails = async()=>{
//   const token = localStorage.getItem("NGauth")
//   console.log("this is token ",token)

//   const res= await axios.post(api.user.handleGetDetails ,{token})
//   // console.log(res ," this is user details ok ")

// }

// useEffect(()=>{
//   handleGetDetails()

// },[])
 


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

// import React from 'react'
// import varaity from "../assets/varaity.json"
// import card from "../assets/card.json"
// import girlwardrope from "../assets/girlwardrope.json"
// import { Link, useLocation } from 'react-router-dom'
// import { IoArrowForward, IoArrowBack, IoArrowUp } from "react-icons/io5";
// import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";
// import { useState } from 'react';
// import { useEffect } from 'react';
// import Marquee from "react-fast-marquee";
// import api from '../services/endpoint'
// import axios from "axios"
// import Navbar from '../components/Navbar'

// const Home = () => {
//     const images = [
//         "https://cdn.fcglcdn.com/brainbees/banners/hp_mktg_p01_flash_10_big_desktop1760785788353.webp",
//         "https://cdn.fcglcdn.com/brainbees/banners/hp_mktg_p01_prim_6_flat4542_desktop1760785396396.webp",
//         "https://cdn.fcglcdn.com/brainbees/banners/mktng_nonapps_base_nursery_hp_26october25_au1760696702924.webp",
//     ];

//     const [current, setCurrent] = useState(0);
//     const [email, setEmail] = useState()
//     const [showScrollTop, setShowScrollTop] = useState(false)
//     const location = useLocation()

//     useEffect(() => {
//         setEmail(location?.state?.email)
//     }, [location])

//     const handleGetDetails = async () => {
//         const token = localStorage.getItem("NGauth")
//         const res = await axios.post(api.user.handleGetDetails, { token })
//         console.log(res, " this is user details ok ")
//     }

//     useEffect(() => {
//         handleGetDetails()
//     }, [])

//     // Auto slide for hero
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % images.length);
//         }, 4000);
//         return () => clearInterval(interval);
//     }, []);

//     // Show scroll to top button
//     useEffect(() => {
//         const handleScroll = () => {
//             setShowScrollTop(window.scrollY > 300)
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     }

//     const nextSlide = () => {
//         setCurrent((prev) => (prev + 1) % images.length)
//     }

//     const prevSlide = () => {
//         setCurrent((prev) => (prev - 1 + images.length) % images.length)
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-b mt-70 from-gray-50 to-white">
//             {/* Scroll to Top Button */}
//             {showScrollTop && (
//                 <button
//                     onClick={scrollToTop}
//                     className="fixed bottom-8 right-8  bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1"
//                     aria-label="Scroll to top"
//                 >
//                     <IoArrowUp size={24} />
//                 </button>
//             )}

//             {/* Marquee Section */}
//             <div className="sticky top-0  bg-white shadow-md">
//                 <Marquee pauseOnHover={true} gradient={false} speed={40} className="py-2">
//                     <div className='flex items-center justify-center gap-6 md:gap-8 px-4'>
//                         {varaity.map((value, index) => (
//                             <div key={index} className="group cursor-pointer transition-all duration-300 hover:scale-105">
//                                 <div className="relative overflow-hidden rounded-full w-16 h-16 md:w-20 md:h-20 border-2 border-gray-200 group-hover:border-pink-400">
//                                     <img
//                                         src={value.image}
//                                         alt={value.title}
//                                         className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
//                                     />
//                                 </div>
//                                 <p className="text-xs md:text-sm text-center mt-2 font-medium text-gray-700 group-hover:text-pink-600">
//                                     {value.title}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </Marquee>
//             </div>

//             {/* Hero Slider */}
//             <div className="relative w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-4 md:mt-8">
//                 <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
//                     <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
//                         <div
//                             className="flex transition-transform duration-700 ease-out"
//                             style={{ transform: `translateX(-${current * 100}%)` }}
//                         >
//                             {images.map((img, idx) => (
//                                 <div key={idx} className="w-full flex-shrink-0">
//                                     <img
//                                         src={img}
//                                         alt={`Slide ${idx + 1}`}
//                                         className="w-full h-full object-cover"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Slider Navigation */}
//                         <button
//                             onClick={prevSlide}
//                             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//                             aria-label="Previous slide"
//                         >
//                             <IoArrowBack size={24} className="text-gray-800" />
//                         </button>
//                         <button
//                             onClick={nextSlide}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
//                             aria-label="Next slide"
//                         >
//                             <IoArrowForward size={24} className="text-gray-800" />
//                         </button>

//                         {/* Dots Indicator */}
//                         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                             {images.map((_, idx) => (
//                                 <button
//                                     key={idx}
//                                     onClick={() => setCurrent(idx)}
//                                     className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${current === idx ? 'bg-white scale-125' : 'bg-white/60'}`}
//                                     aria-label={`Go to slide ${idx + 1}`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
//                 {/* Section Title */}
//                 <div className="text-center mb-8 md:mb-12">
//                     <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//                         What are you looking for?
//                     </h1>
//                     <p className="text-gray-600 mt-2 md:mt-4 text-sm md:text-base">
//                         Discover amazing products curated just for you
//                     </p>
//                 </div>

//                 {/* Category Grid */}
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-12 md:mb-16">
//                     {varaity.slice(0, 5).map((value, index) => (
//                         <div
//                             key={index}
//                             className="group relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
//                         >
//                             <div className="relative h-40 md:h-48 overflow-hidden">
//                                 <img
//                                     src={value.image}
//                                     alt={value.title}
//                                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                             </div>
//                             <div className="p-3 md:p-4 text-center">
//                                 <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-1">
//                                     {value.title}
//                                 </h3>
//                                 <p className="text-pink-600 font-bold mt-1 text-sm md:text-base">
//                                     ₹{value.price}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Two Column Layout */}
//                 <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
//                     {/* Left Column */}
//                     <div className="lg:w-1/2">
//                         {/* Girls Wardrobe Section */}
//                         <div className="mb-8 md:mb-12">
//                             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center lg:text-left">
//                                 <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
//                                     Girl's Wardrobe
//                                 </span>
//                             </h2>
//                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
//                                 {girlwardrope.map((value, idx) => (
//                                     <div
//                                         key={idx}
//                                         className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//                                     >
//                                         <div className="aspect-square overflow-hidden">
//                                             <img
//                                                 src={value.image}
//                                                 alt=""
//                                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                             />
//                                         </div>
//                                         <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                             <button className="bg-white p-2 rounded-full shadow-lg hover:bg-pink-50">
//                                                 <FaHeart size={16} className="text-pink-500" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Promo Banner */}
//                         <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
//                             <img
//                                 src="https://static.hopscotch.in/fstatic/boutique/banner/202509/2956fe38-adf2-4b37-9a06-355107239a3e_full.jpg?version=1757562470992&tr=f-webp,w-480,c-at_max,n-normal"
//                                 alt="Promotion"
//                                 className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
//                             />
//                         </div>
//                     </div>

//                     {/* Right Column */}
//                     <div className="lg:w-1/2">
//                         {/* Trending Section */}
//                         <div className="mb-8 md:mb-12">
//                             <div className="flex items-center justify-between mb-4 md:mb-6">
//                                 <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
//                                     <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                                         On Everyone's Style Radar
//                                     </span>
//                                 </h2>
//                                 <Link
//                                     to="/trending"
//                                     className="flex items-center gap-1 text-sm md:text-base text-purple-600 hover:text-purple-800 font-medium"
//                                 >
//                                     View All <IoArrowForward />
//                                 </Link>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
//                                 {card.map((value, idx) => (
//                                     <div
//                                         key={idx}
//                                         className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
//                                     >
//                                         <div className="relative h-64 md:h-80 overflow-hidden">
//                                             <img
//                                                 src={value.image}
//                                                 alt=""
//                                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                             />
//                                             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                                             <div className="absolute top-4 right-4">
//                                                 <button className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
//                                                     <FaHeart size={18} className="text-pink-500" />
//                                                 </button>
//                                             </div>
//                                             <div className="absolute bottom-4 left-4 right-4">
//                                                 <button className="w-full bg-white/95 hover:bg-white text-gray-800 py-2 md:py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                                                     Add to Cart
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Gifting Section */}
//                         <div>
//                             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
//                                 <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
//                                     Gifting Corner
//                                 </span>
//                             </h2>
//                             <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
//                                 <img
//                                     src="https://static.hopscotch.in/fstatic/boutique/banner/202510/d5a52d3d-5c44-4c64-81db-0a5df7a0810a_full.jpg?version=1759493926623&tr=f-webp,w-480,c-at_max,n-normal"
//                                     alt="Gifting Corner"
//                                     className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
//                                 />
//                                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
//                                     <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full shadow-lg">
//                                         Shop Now
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* CTA Button */}
//                 <div className="text-center mt-12 md:mt-16">
//                     <Link
//                         to="/products"
//                         className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-pink-500/30 hover:-translate-y-1 transition-all duration-300"
//                     >
//                         Explore All Products
//                         <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
//                     </Link>
//                 </div>
//             </main>

//             {/* Footer CTA */}
//             <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-8 md:py-12 mt-12 md:mt-16">
//                 <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
//                     <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
//                         Never Miss a Deal!
//                     </h3>
//                     <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm md:text-base">
//                         Subscribe to our newsletter and get exclusive offers delivered straight to your inbox.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//                         <input
//                             type="email"
//                             placeholder="Enter your email"
//                             className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-pink-500 focus:outline-none text-white"
//                         />
//                         <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1">
//                             Subscribe
//                         </button>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default Home