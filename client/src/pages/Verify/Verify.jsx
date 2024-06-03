import React, { useContext, useEffect } from 'react';
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

export function Verify() {

    //find url parameter
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    //check data store in this variables or not
    // console.log(success,orderId);
    
    //get server url from the context api
    const {url} = useContext(StoreContext);

    //navigate user to My orders
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if (response.data.success) {
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }

    //run verifyPayment function when verify component will be loaded
    useEffect(()=>{
        verifyPayment();
    },[])


  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}
