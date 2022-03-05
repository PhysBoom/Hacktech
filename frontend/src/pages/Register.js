import React, {useState} from 'react';
import axios from 'axios';
import TextInputBox from '../components/TextInputBox';
import {ButtonPrimary} from '../components/Buttons';
import {TextNotify} from '../components/Alerts';
import {Toaster} from 'react-hot-toast';

function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegistration(){
        const resp = await axios({
            method: "POST",
            url: "/auth/register",
            data: {
                email: email,
                password: password
            }
        })
        if (resp.data.success){
            TextNotify(resp.data.message, "success");
        } else {
            TextNotify(resp.data.error, "error");
        }
        
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-full w-screen">
                <div className="flex flex-col space-y-6 justify-center items-center drop-shadow-lg bg-white rounded-md p-6 border-2 border-primary">
                    <h1 className="text-2xl font-bold text-black">Register</h1>
                    <TextInputBox inputName="Email" name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <TextInputBox inputName="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <ButtonPrimary onClick={handleRegistration}>Register</ButtonPrimary>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Register;