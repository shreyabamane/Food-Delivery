import React from 'react';
import { MdOutlineCloudUpload } from "react-icons/md";

import './Add.css';

export function Add() {
  return (
    <div className='add'>
      <form className='flex-col'>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
                {/* upload area */}
            <MdOutlineCloudUpload /> 
          </label>
          <input type="file" id='image' hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name='name' placeholder='Type here' />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" rows="16" placeholder='Write content here'></textarea>
        </div>

        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number" name='price' placeholder='$20' />
          </div>

        </div>

        <button type='submit' className='add-btn'>ADD</button>

      </form>
    </div>
  )
}
