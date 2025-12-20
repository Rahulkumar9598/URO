import React from 'react'
import { Link } from 'react-router-dom'

const Navbar2 = () => {
  return (
    <div className=' hidden md:block bg-gray-50 w-full z-10 ' style={{position:"fixed" , top:72,left:0}}>
        <ul className='flex flex-nowrap w-full justify-around p-3' >
           <Link to="/boy-fashion">Boys Fashion</Link>
           <Link to="/girl-fashion">Girl Fashion</Link>
           <Link to="/footWear">Foot Wear</Link>
           <li>Toys</li>
           <li>Diapering</li>
           <li>Gear</li>
           <li>Health</li>
           <li>Moms</li>
        </ul>
    </div>
  )
}

export default Navbar2