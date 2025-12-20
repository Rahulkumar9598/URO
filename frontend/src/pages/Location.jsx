import React from 'react'
import { FaUser } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useState } from 'react';
import state from '../assets/data/state.json';
import district from '../assets/data/district.json';

const phoneRegex = /^[0-9]{10}$/;

const Location = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [selectedState,setSelectedState]=useState("");
    const [districtForSelect , setDistrictForSelect] = useState([])

    const handleChange = (e) => {
        const value = e.target.value;
        // Allow only digits
        if (/[^0-9]/.test(value)) {
            setError("⚠️ Please enter digits only (no letters or symbols).");
        } else {
            setError("");
        }
        setPhone(value.replace(/\D/g, "")); // remove non-digits
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!phoneRegex.test(phone)) {
            setError("❌ Please enter a valid 10-digit  phone number .");
            return; // 🚫 stop submission
        }

        // setError("");
        // alert("✅ Phone number submitted: " + phone);
    };

    const handleStateChange = (e) => {
        const {value} = e.target;
        setSelectedState(value)
        const selectedStateDistrict = district[value]
        setDistrictForSelect(selectedStateDistrict)
    }


    return (
        <div className='w-full h-auto  sticky top-0 left-0 bg-gray-500/20 backdrop-blur flex justify-center'>
            <div className='bg-white w-[50%] text-gray mt-30   '>
                <form onSubmit={() => handleSubmit()}>
                    <div className='w-full px-15 pb-10   '>

                        <div>
                            <h1 className='text-3xl font-bold  flex justify-center '> Delivery Address</h1>
                            <p className='text-lg text-gray-500  flex justify-center '>Please provide your complete  address deatils</p>
                        </div>

                        <div className='pt-5 w-full flex justify-between pb-6'>
                            <div className='flex flex-col w-[48%]'>


                                <label htmlFor="firstName">First Name</label>

                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="firstName" required />
                            </div>
                            <div className='flex flex-col w-[48%]'>
                                <label htmlFor="lastName">Last Name</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="lastName" required />
                            </div>


                        </div>
                        <div className='pt-5 w-full flex justify-center gap-5  pb-6'>
                            <div className='flex flex-col w-full'>


                                <label htmlFor="phone">Phone Number</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="tel" placeholder='1234567890' id="phone" maxLength={10} minLength={10}
                                    value={phone}
                                    onChange={handleChange}
                                    required
                                />
                                {/* show error message */}
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            </div>
                        </div>
                        <div className='pt-5 w-full flex justify-between pb-6'>
                            <div className='flex flex-col w-[48%]'>


                                <label htmlFor="addressLine1">Address Line 1</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="addressLine1" required />
                            </div>
                            <div className='flex flex-col w-[48%]'>
                                <label htmlFor="addressLine2">Street</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="addressLine2" required />
                            </div>


                        </div>
                        <div className='pt-5 w-full flex justify-center gap-5  pb-6'>
                            <div className='flex flex-col w-full'>

                                <label htmlFor="addressLine2">Address Line 2</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="tel" placeholder='Mahanagar' id="addressLine2" required />
                            </div>
                        </div>
                        <div className='pt-5 w-full flex justify-between pb-6'>
                            <div className='flex flex-col w-[48%]'>


                                <label htmlFor="district">District</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="district"
                                    list='districtsList'
                                    required />
                            </div>
                            <datalist id="districtsList">
                                {districtForSelect?.map((d) => (
                                    <option key={d} value={d} />
                                ))}
                            </datalist>

                            <div className='flex flex-col w-[48%]'>


                                <label htmlFor="state">State</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="state"
                                    list='statesList'
                                    required
                                    onChange={(e) => handleStateChange(e)}
                                    onPaste={(e) => e.preventDefault()} />
                            </div>

                            <datalist id="statesList">
                                {state.map((state) => (
                                    <option key={state} value={state} />
                                ))}
                            </datalist>


                        </div>
                        <div className='pt-5 w-full  flex justify-between pb-6'>
                            <div className='flex flex-col w-[48%]'>
                                <label htmlFor="zip">Zip Code</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 w-full' type="text" placeholder='Enter your name' id="zip" required />

                            </div>
                            <div className='flex flex-col w-[48%]'>


                                <label htmlFor="country">Country</label>
                                <input className='border-2 border-gray-400 rounded-md px-2 py-3 full' type="text" placeholder='Enter your name' id="country" required />
                            </div>

                        </div>

                        <button type='submit' className='bg-blue-500 px-5 py-2 flex  text-lg text-white text-center justify-self-center rounded'>Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Location