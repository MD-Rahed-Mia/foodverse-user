import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { api_path_url, authToken } from '../secret';
import Cookies from "js-cookie";

export default function ChangePassword() {

    const initialForm = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    }

    const [form, setForm] = useState(initialForm);


    function handleChange(e) {
        const { value, name } = e.target;
        setForm((prev) => ({ ...form, [name]: value }));
    }

    async function handleSubmit() {

        const id = Cookies.get("id");

        if (!id) {
            toast.error("Please login properly.");
            return;
        }

        if (form.newPassword !== form.confirmPassword) {
            toast.error("confirm password not match.")
            return;
        }
        if (form.newPassword.length <= 5) {
            toast.error("new password too short. Minimum required 6 digits and more.");
            return;
        }
        try {


            const { data } = await axios.put(`${api_path_url}/user/change-password?id=${id}`, {
                currentPassword: form.oldPassword,
                newPassword: form.newPassword
            }, {
                headers: {
                    "x-auth-token": authToken
                }
            });

            console.log(data)

            if (data.success) {
                toast.success(data.message);
                setForm(initialForm)
            } else {
                toast.error(data.message);
            }


        } catch (error) {
            console.log(error.message);
            console.log(error.response)
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

    return (
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center min-h-screen p-2">
            <div>
                <div className='flex items-center flex-col mt-3 w-full text-left'>
                    <label className='text-left' htmlFor="currentPassword">Current Password</label>
                    <input type="password" name="oldPassword" className='w-full focus:outline-none outline-none border rounded-full px-2 py-2 shadow-lg' id="currentPassword" placeholder='current password' onChange={handleChange} value={form.oldPassword} />
                </div>
                <div className='flex items-center flex-col mt-3 w-full text-left'>
                    <label className='text-left' htmlFor="newPassword">New Password</label>
                    <input type="password" name="newPassword" className='w-full focus:outline-none outline-none border rounded-full px-2 py-2 shadow-lg' id="newPassword" placeholder='new password' onChange={handleChange} value={form.newPassword} />
                </div>
                <div className='flex items-center flex-col mt-3 w-full text-left'>
                    <label className='text-left' htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" className='w-full focus:outline-none outline-none border rounded-full px-2 py-2 shadow-lg' id="confirmPassword" placeholder='confirm password' onChange={handleChange} value={form.confirmPassword} />
                </div>
                <div>
                    <button onClick={handleSubmit} className='mt-4 px-12 py-3 rounded-full bg-blue-500 text-white'>Change Password</button>
                </div>
            </div>
        </div>
    )
}
