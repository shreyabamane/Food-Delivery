import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket } from "react-icons/fa";

import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';


export function Navbar({setShowLogin}) {

  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
       <Link to='/'><img src={assets.logo} alt="logo" width="100%" height="50px" /></Link>
       <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
       </ul>

       <div className="navbar-right">
        <CiSearch size={20}/>

        <div className="navbar-search-icon">
          <Link to='/cart'> <FaShoppingBasket size={20} /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        <button onClick={() => setShowLogin(true)}>sign in</button>
       </div>
    </div>
  )
}
