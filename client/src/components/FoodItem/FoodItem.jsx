import React, { useState } from 'react';
import { IoIosAddCircle, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

import './FoodItem.css';
import { assets } from '../../assets/assets';

export function FoodItem({id,name,price,description,image}) {

  const [itemCount, setItemCount] = useState(0);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
        {
            !itemCount
            ? <IoIosAddCircle className='add' onClick={() => setItemCount(prev=>prev+1)} color='white' size={30}/>
            : <div className='food-item-counter'>
                <IoMdRemoveCircle onClick={() => setItemCount(prev => prev-1) } color='red' size={30}/>
                <p>{itemCount}</p>
                <IoMdAddCircle onClick={() => setItemCount(prev => prev+1) } color='green' size={30} />

            </div>
        }
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>

        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}
