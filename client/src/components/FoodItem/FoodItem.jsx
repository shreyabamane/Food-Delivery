import React, { useContext } from 'react';
import { IoIosAddCircle, IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";

import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

export function FoodItem({id,name,price,description,image}) {

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={image} alt="" />
        {
            !cartItems[id]
            ? <IoIosAddCircle className='add' onClick={() => addToCart(id)} color='white' size={30}/>
            : <div className='food-item-counter'>
                <IoMdRemoveCircle onClick={() => removeFromCart(id) } color='red' size={30}/>
                <p>{cartItems[id]}</p>
                <IoMdAddCircle onClick={() => addToCart(id) } color='green' size={30} />

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
