import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
  <div className="footer-content">
    <div className="footer-content-left">
      <img src={assets.logo} alt="" />
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed eius labore eveniet voluptatibus sunt minima.</p>
      <div className="footer-social-icons">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.linkedin_icon} alt="" />
      </div>
    </div>

    <div className="footer-content-center">
      <h2>COMPANY</h2>
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

    <div className="footer-content-right">
      <h2>GET IN TOUCH</h2>
      <ul>
        <li>+1-292-233-232</li>
        <li>contact@tomato.com</li>
      </ul>
    </div>
  </div>

  {/* Divider line */}
  <hr className="footer-divider" />

  {/* Copyright center-aligned */}
  <p className="footer-copyright">Copyright 2025- Tomato.com</p>
</div>

  )
}

export default Footer
