import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { MdDelete } from "react-icons/md";
import { Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { api_path_url, authToken } from '../secret';
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { useAuth } from '../contexts/AuthContext';

export default function DeleteAccount() {
    const [isChecked, setIsChecked] = useState(false);
    const [passwodForm, setPasswordForm] = useState(false);

    const { user, setUser } = useAuth()

    const [requestType, setRequestType] = useState(user?.isDeleteReq)

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if (e.target.checked) {
            setIsChecked(true);
        } else {
            setIsChecked(false)
        }
    };

    useEffect(() => {
        setRequestType(user?.isDeleteReq)
    }, [user]);


    if (requestType) {
        return <DeleteAccountStatus />
    }

    return (
        <>
            <Header title={"Delete Account"} />
            <div className='flex items-center justify-center w-full h-screen'>
                <div className='w-4/5 border rounded-lg shadow-lg bg-white min-h-[350px]'>
                    <div className=' mx-auto flex items-center justify-center my-4 text-5xl h-16 w-16 rounded-full bg-gray-200 '>
                        <MdDelete className='text-red-500 font-bold' />
                    </div>
                    <div>
                        <h1 className='w-full text-center text-lg font-semibold'>Delete Account</h1>
                    </div>
                    <div>
                        <h1 className='w-4/5 mx-auto  text-center'>All of your account information will delete parmanently. Are you sure you want to delete account?</h1>
                    </div>
                    <div className='w-4/5 mx-auto mt-4'>
                        <Checkbox onChange={onChange}>I understand that I wont be able to recover my account.</Checkbox>
                    </div>
                    <div className='w-4/5 flex mx-auto items-center justify-center gap-3 mt-4'>
                        <Link to={"/about"} className='px-4 py-2 text-center bg-gray-300 rounded-lg w-full'>Go Back</Link>
                        <button disabled={!isChecked} className={`px-4 py-2 text-center  rounded-lg text-white w-full  disabled:bg-gray-300 bg-red-500 disabled:text-black`} onClick={() => setPasswordForm(true)}>Delete</button>
                    </div>
                </div>
            </div>

            {
                passwodForm ? <DeleteAccountPasswordForm setPasswordForm={setPasswordForm} passwodForm={passwodForm} /> : null
            }
        </>
    )

}

function DeleteAccountPasswordForm({ setPasswordForm, passwodForm }) {
    const [password, setPassword] = useState("")

    const { user, setUser } = useAuth()

    async function sendDeleteReq() {
        const id = Cookies.get("id");

        if (!id) {
            toast.error("Invalid ID");
            return;
        }

        try {
            const { data } = await axios.put(`${api_path_url}/user/delete-account?id=${id}`, {
                password
            }, {
                headers: {
                    "x-auth-token": authToken
                }
            });

            console.log(data);

            if (data.success) {
                toast.success(data.message);
                setUser((prev) => ({ ...prev, isDeleteReq: true }));
                console.log(user)
            } else {
                toast.error(data.message);  // Error toast (if the operation fails)
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
            return;
        }
    }


    async function handleSubmitDeleteAccount(event) {
        event.preventDefault();
        sendDeleteReq();
    }

    return <>
        <div className='w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/[.5]'>
            <div className='w-4/5 border rounded-lg shadow-lg bg-white min-h-[350px]'>
                <div className=' mx-auto flex items-center justify-center my-4 text-5xl h-16 w-16 rounded-full bg-gray-200 '>
                    <MdDelete className='text-red-500 font-bold' />
                </div>
                <div>
                    <h1 className='w-full text-center text-lg font-semibold'>Delete Account</h1>
                </div>
                <div>
                    <h1 className='w-4/5 mx-auto  text-center'>All of your account information will delete parmanently. Are you sure you want to delete account?</h1>
                </div>
                <form action="" method='post' onSubmit={handleSubmitDeleteAccount}>


                    <div className='w-4/5 mx-auto mt-4'>
                        <label htmlFor="password">Confirm password</label>
                        <input type="password" name="password" id="password" className='w-full px-2 py-2 bg-gray-100 focus:bg-gray-100 min-h-7 shadow-lg rounded-md' placeholder='please enter your password' onChange={(e) => setPassword((prev) => e.target.value)} value={password} />
                    </div>


                    <div className='w-4/5 flex mx-auto items-center justify-center gap-3 mt-4'>
                        <button className='px-4 py-2 text-center h-10  bg-gray-300 rounded-lg w-full' onClick={() => setPasswordForm(!setPasswordForm)}>Go Back</button>
                        <button type='submit' className={`px-4 text-sm h-10 py-2 text-center  rounded-lg text-white w-full  disabled:bg-gray-300 bg-red-500 disabled:text-black`} >Confirm Delete</button>
                    </div>
                </form>


            </div>
        </div>
    </>
}


function DeleteAccountStatus() {

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    async function cancelDeleteAccount() {
        const id = Cookies.get("id");

        const isConfirm = window.confirm("are you sure?");

        if (!isConfirm) {

            return;
        }


        if (!id) {
            toast.error("Invalid ID");
            return;
        }

        try {
            const { data } = await axios.put(`${api_path_url}/user/cancel-delete-account?id=${id}`, {
            }, {
                headers: {
                    "x-auth-token": authToken
                }
            });

            // console.log(data);

            if (data.success) {
                toast.success(data.message);
                setUser((prev) => ({ ...prev, isDeleteReq: false }));
                navigate("/about");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.response.data.message);
            return;
        }
    }


    return <>
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='w-4/5 border rounded-lg shadow-lg bg-white min-h-[350px]'>
                <div className=' mx-auto flex items-center justify-center my-4 text-5xl h-16 w-16 rounded-full bg-gray-200 '>
                    <MdDelete className='text-red-500 font-bold' />
                </div>
                <div>
                    <h1 className='w-full text-center text-lg font-semibold'>Delete Account</h1>
                </div>
                <div className='w-4/5 mx-auto text-center mt-3'>
                    <h1>Delete Request has been sent. Your account will delete within 3days.</h1>
                </div>
                <div className='w-4/5 flex mx-auto items-center justify-center gap-3 mt-4'>
                    <Link to={"/about"} className='px-4 py-2 text-center h-10  bg-gray-300 rounded-lg w-full'>Go Back</Link>
                    <button type='submit' className={`px-4 text-sm h-10 py-2 text-center  rounded-lg text-white w-full  disabled:bg-gray-300 bg-red-500 disabled:text-black`} onClick={cancelDeleteAccount}>Cancel Delete</button>
                </div>

            </div>
        </div>
    </>
}
