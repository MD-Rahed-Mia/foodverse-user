import React from 'react'

export default function HelpAndSupport() {



    const whatsappNumber = "+8801736497140";
    const phoneNumber = "+8801736497140";
    const email = "foodverse2024@gmail.com";

    function makeCall() {
        window.location.href = `tel:${phoneNumber}`;
    }

    function sendEmail() {
        window.location.href = `mailto:${email}`;
    }

    function openWhatsApp() {
        window.location.href = `https://wa.me/${whatsappNumber}`;
    }









    return (
        <div>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white min-h-screen flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-gray-800 mx-6">
                    <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">Help & Support</h1>
                    <p className="text-center text-gray-600 mb-8">We're here to assist you. Let us know your concerns!</p>

                    <div className="space-y-6">

                        <div className="flex items-center p-5 bg-purple-50 border-l-4 border-purple-600 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-purple-600 text-4xl mr-5">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Address</p>
                                <p className="text-sm text-gray-600">Noakhali Sadar, Noakhali</p>
                            </div>
                        </div>


                        <div onClick={makeCall} className="flex items-center p-5 bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-blue-600 text-4xl mr-5">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Call</p>
                                <p className="text-sm text-gray-600">+8801736497140</p>
                            </div>
                        </div>


                        <div onClick={sendEmail} className="flex items-center p-5 bg-purple-50 border-l-4 border-purple-600 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-purple-600 text-4xl mr-5">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Email Us</p>
                                <p className="text-sm text-gray-600">foodverse2024@gmail.com</p>
                            </div>
                        </div>


                        <div onClick={openWhatsApp} className="flex items-center p-5 bg-green-50 border-l-4 border-green-600 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-green-600 text-4xl mr-5">
                                <i className="fab fa-whatsapp"></i>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">WhatsApp</p>
                                <p className="text-sm text-gray-600">+8801736497140</p>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}
