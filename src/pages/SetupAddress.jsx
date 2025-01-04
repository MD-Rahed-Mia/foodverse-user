import React from 'react'
import SetAddressManager from '../components/SetAddressManager'

export default function SetupAddress() {
    return (
        <div className="mb-24">
            <div className="pt-[75px]"></div>
            <h1 className='text-lg text-center text-gray-700 font-semibold '>Please setup an address.</h1>
            <div>
                <SetAddressManager />
            </div>
        </div>
    )
}
