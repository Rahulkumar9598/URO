import React from 'react'
import  {FaShoePrints ,}   from 'react-icons/fa';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP ,
  FaMapMarkerAlt ,
  FaPhoneAlt,
  FaEnvelope  
} from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 text-black mt-12">
            <div className="container mx-auto px-4 py-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <FaShoePrints className="mr-2" />
                    URO Store
                  </h3>
                  <p className="text-black">Your one-stop destination for all footwear needs. Quality shoes for every occasion.</p>
                  <div className="flex space-x-4 mt-6">
                    <a href="#" className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center hover:bg-red-600">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center hover:bg-red-600">
                      <FaTwitter />
                    </a>
                    <a href="#" className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center hover:bg-red-600">
                      <FaInstagram />
                    </a>
                    <a href="#" className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center hover:bg-red-600">
                      <FaPinterestP />
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-black ">Home</a></li>
                    <li><a href="#" className="text-black ">New Arrivals</a></li>
                    <li><a href="#" className="text-black ">Best Sellers</a></li>
                    <li><a href="#" className="text-black ">Sale</a></li>
                    <li><a href="#" className="text-black ">About Us</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4">Customer Service</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-black ">Contact Us</a></li>
                    <li><a href="#" className="text-black ">FAQ</a></li>
                    <li><a href="#" className="text-black ">Shipping Policy</a></li>
                    <li><a href="#" className="text-black ">Returns & Exchanges</a></li>
                    <li><a href="#" className="text-black ">Size Guide</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4">Contact Info</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaMapMarkerAlt className="mr-3 mt-1" />
                      <span className="text-black">123 Shoe Street, Fashion City, FC 10001</span>
                    </li>
                    <li className="flex items-center">
                      <FaPhoneAlt className="mr-3" />
                      <span className="text-black">1-800-FOOTWEAR</span>
                    </li>
                    <li className="flex items-center">
                      <FaEnvelope className="mr-3" />
                      <span className="text-black">support@urostore.com</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-red-500 mt-10 pt-6 text-center text-black">
                <p>&copy; 2023 Uro Store. All rights reserved. Inspired by FirstCry and Hoppscotch.</p>
              </div>
            </div>
          </footer>
     </>
  )
}

export default Footer