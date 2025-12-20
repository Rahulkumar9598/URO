import React from 'react'

const Map = () => {
    const name = ["rahul", "rohit", "amit", "pankaj"];
    return (
        name.map((value ,index) => (
            <h1 key={index} className='bg-red-600'>{value} </h1>
        )
        )
    )
}

export default Map