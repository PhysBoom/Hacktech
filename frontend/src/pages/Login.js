import React, {useState, useContext} from 'react';
import TextInputBox from '../components/TextInputBox';
import {ButtonPrimary} from '../components/Buttons';
import {TextNotify} from '../components/Alerts';
import {Toaster} from 'react-hot-toast';
import AuthContext from '../context/auth-context';
import {useHistory} from 'react-router-dom';
import {FullScreenLoader} from '../components/Loaders';

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = useContext(AuthContext);
    const history = useHistory();

    async function handleLogin(){
        setLoading(true);
        const resp = await auth.login(email, password);
        if (resp.data.success){
            history.push("/gamemodes");
        } else {
            TextNotify(resp.data.error, "error");
        }
        setLoading(false);
    }

    return (
        <>
            {loading && <FullScreenLoader />}
            <div className="flex flex-col justify-center items-center h-full w-screen">
                <div className="flex flex-col space-y-6 justify-center items-center drop-shadow-lg bg-white rounded-md p-6 border-2 border-primary">
                    <h1 className="text-2xl font-bold text-black">Login</h1>
                    <TextInputBox inputName="Email" name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <TextInputBox inputName="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <ButtonPrimary onClick={handleLogin}>Login</ButtonPrimary>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Login;