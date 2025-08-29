import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useEffect } from 'react'

const Verify = () => {

    // React Router hook to read query parameters from URL (like success & orderId)
    const [searchParams, setSearchParams] = useSearchParams()

    // Extracting query parameters sent from Stripe checkout success/cancel URL
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    // Getting base API URL from StoreContext
    const { url } = useContext(StoreContext)

    // React Router hook for navigation
    const navigate = useNavigate();

    // Function to verify payment with backend
    const verifyPayment = async () => {
        // Sending success status and orderId to backend for verification
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        
        // If payment is successful → redirect to "My Orders" page
        if (response.data.success) {
            navigate("/myorders")
        }
        // If payment failed → redirect back to homepage
        else {
            navigate("/")
        }
    }

    // useEffect will run once when component mounts ([]) → calls verifyPayment
    useEffect(() => {
        verifyPayment()
    }, [])

    return (
        <div className='verify'>
            {/* Loader/spinner UI while verifying payment */}
            <div className='spinner'></div>
        </div>
    )
}

export default Verify
