import React, {useContext} from 'react'
import './OrderItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const OrderItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='order-item'>
      <div className="order-item-img-container">
        <img className = "order-item-image" src={url+"/images/"+image} alt="" />
        {!cartItems[id]?
        <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}></img>
            :
        <div className='order-item-counter'>
            <img onClick = {()=> removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick = {()=> addToCart(id)} src={assets.add_icon_green} alt="" />
        </div>
        }
      </div>
      <div className="order-item-info">
        <div className="order-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="order-item-desc">{description}</p>
        <p className="order-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default OrderItem
