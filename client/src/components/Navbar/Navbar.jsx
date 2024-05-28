import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";

import './Navbar.css';
import { assets } from '../../assets/assets';


export function Navbar() {

  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
       <img src={assets.logo} alt="logo" />
       <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
       </ul>

       <div className="navbar-right">
        <CiSearch size={20}/>

        <div className="navbar-search-icon">
          <FaShoppingBasket size={20} />
          <div className="dot"></div>
        </div>

        <button>sign in</button>
       </div>
    </div>
  )
}
