import React from 'react'
import './Footer.css'

import logo from '../../assets/frontend_assets/logo.png'
import facebook_icon from "../../assets/frontend_assets/facebook_icon.png";
import twitter_icon from "../../assets/frontend_assets/twitter_icon.png";
import linkedin_icon from "../../assets/frontend_assets/linkedin_icon.png";
function Footer() {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <img src={logo} alt=''/>
                <p className='pt'>
  Fresh food delivered to your doorstep with quality, speed, and care. 
  We make every meal special and every order satisfying.
</p>
            <div className="footer-icon">

                <img src={facebook_icon} alt="facebook" />
                
<img src={twitter_icon} alt="twitter" />
<img src={linkedin_icon} alt="linkedin" />
            </div>
            </div>
            <div className="footer-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>GET IN TOUCH</h2>
                <ul>
<li>+1-38732387227242</li>
<li>contexec2gmail.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-cp"> © 2026 Your Company. All Rights Reserved.</p>
    </div>
  )
}

export default Footer