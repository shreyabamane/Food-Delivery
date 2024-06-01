import React, { useContext, useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';

export function LoginPopup({ setShowLogin }) {

    const {url, setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    //create onChange handler that will pick the data from the input field & saved it into state variable
    const onChangehandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //set this value in state variable
        setData(data=>({...data,[name]:value}))
    }

    //verify this data run use effect
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    const onLogin = async (event) => {
        event.preventDefault()

        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }

        //call api
        const response = await axios.post(newUrl,data);

        //get response
        if (response.data.success) {
            setToken(response.data.token);
            //save this token in local storage
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)//hide login page
        }
        else{
            alert(response.data.message)
        }
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <RxCross1 onClick={() => setShowLogin(false)} size={20} />
                </div>

                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangehandler} value={data.name} type="text" placeholder='Your Name' required />}
                    <input name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder='Password' required />
                </div>

                <button type='submit'>{currState === 'Sign Up' ? "Create Account" : 'Login'}</button>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }

            </form>
        </div>
    )
}
