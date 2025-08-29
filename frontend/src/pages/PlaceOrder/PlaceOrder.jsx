import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const PlaceOrder = () => {
  // ✅ Accessing global context values
  // - getTotalCartAmount → calculates cart total
  // - token → authentication token (JWT)
  // - food_list → all food items
  // - cartItems → what user added in cart
  // - url → backend base URL
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  // ✅ Local state to store delivery form data
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  // ✅ Update delivery form data when user types
  const onChangeHandler = (event) => {
    const name = event.target.name   // input field name
    const value = event.target.value // input field value
    setData(data => ({ ...data, [name]: value })) // merge into state
  }

  // ✅ Function that runs when user submits order
  const placeOrder = async (event) => {
    event.preventDefault() // stop default form submission

    let orderItems= []

    // ✅ Loop through all food items
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){ // only if item is in cart
        let itemInfo = item;
        // add quantity info from cart
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo) // add to final order list
      }
    })

    // ✅ Create the order object that backend expects
    let orderData = {
      address: data,  // user delivery address
      items: orderItems,  // items in cart with quantities
      amount: getTotalCartAmount() + 2, // total + delivery fee
    }

    // ✅ Send order data to backend API
    let response = await axios.post(
      url+"/api/order/place", 
      orderData, 
      { headers:{token} } // send auth token in header
    )

    // ✅ If backend successfully created order
    if(response.data.success){
      const { session_url } = response.data; // Stripe checkout link
      // redirect user to Stripe payment page
      window.location.replace(session_url);
    }
    else{
      alert("Error")
    }
  }

  const navigate= useNavigate()

  // ✅ Redirect user back to cart if:
  // 1. They are not logged in (no token)
  // 2. Their cart is empty (total = 0)
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart')
    }
  },[token])

  return (
    // ✅ Form for delivery info & order summary
    <form className='place-order' onSubmit={placeOrder}>
      
      {/* Left Side: Delivery Information */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>

      {/* Right Side: Order Summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            {/* Subtotal */}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            {/* Delivery Fee */}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() == 0 ? 0 : 2}</p>
            </div>
            <hr />
            {/* Final Total */}
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() == 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          {/* Submit button triggers placeOrder */}
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
