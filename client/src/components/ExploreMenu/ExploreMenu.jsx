import React from 'react';

import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

export function ExploreMenu({ category, setCategory }) {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'> Our menu is designed to tantalize your taste buds and offer an unforgettable experience. From appetizers to desserts, each dish is crafted with care and passion. Dive into our diverse selection and discover your next favorite meal.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            key={index} className='explore-menu-list-item'
                        >
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}
