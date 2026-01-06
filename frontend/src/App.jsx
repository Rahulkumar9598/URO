import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar2 from './components/Navbar2'
import BoysFashion from './pages/BoysFashion'




function App() {
    // const [jokes , setJokes] = useState([])
   


    // useEffect(()=>{
    //     axios.get('/api/jokes')
    //     .then((response)=>{
    //         setJokes(response.data)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })

    // })


    return (
        <>
            <Navbar />
            <Navbar2 />
            <Outlet />
            <Footer />

            {/* {
                jokes.map((joke,index)=>( 
                    <div key={index} >
                        <h1>{joke.setup}</h1>
                        <h1>{joke.punchline}</h1>
                        <br />

                    </div>
                   
                ))
            } */}
          
              <ToastContainer />

        </>
    )
}

export default App
