import React from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";

import './Sidebar.css';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className='sidebar'>

      <div className="sidebar-options">

        <NavLink to='/add' className="sidebar-option">
            <IoAddCircleOutline size={22} />
            <p>Add Items</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
            <BsBagCheck size={22} />
            <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
            <BsBagCheck size={22} />
            <p>Orders</p>
        </NavLink>

      </div>

    </div>
  )
}
