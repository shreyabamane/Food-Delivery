import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

import './List.css';

export function List({url}) {

  // const url = "http://localhost:8000";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error");
    }
  }

  //remove food grom list
  const removeFood = async (foodId) => {
      //  console.log(foodId);
      //api call
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      //update ui with the new data
      await fetchList();
      //add toast notification so user will see that item will be deleted
      if (response.data.success) {
        toast.success(response.data.message)
      }
      else {
        toast.error("Error")
      }
  }

  useEffect (() => {
    fetchList();
  },[]);


  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
