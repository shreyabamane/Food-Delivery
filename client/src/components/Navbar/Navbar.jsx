import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaShoppingBasket, FaUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";



import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';


export function Navbar({setShowLogin}) {

  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      //after logout send the user to the home page use usenavigate hook
      navigate("/")
  }

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
        <CiSearch size={25}/>

        <div className="navbar-search-icon">
          <Link to='/cart'> <FaShoppingBasket size={25} /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
         : <div className='navbar-profile'>
          <FaUser size={25}/>
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><MdOutlineShoppingBag size={20} color='tomato' /><p>Orders</p></li>
            <hr />
            <li onClick={logout}><IoLogOutOutline size={20} color='tomato'/><p>Logout</p></li>
          </ul>
         </div>
         }

        
       </div>
    </div>
  )
}
