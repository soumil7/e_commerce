import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Verify = () => {
    //verifying payment
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    // it shows null check it after getting stripe -> console.log(success, orderId);

    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify", {success, orderId});
        if(response.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }

    useEffect(()=> {
        verifyPayment();
    }, [])

  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
