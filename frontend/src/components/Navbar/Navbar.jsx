import React, { useState , useContext} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");

    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

    //after logout sending user to homepage 

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token"); 
        setToken("");
        navigate("/");
    }

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt='' className='logo'/></Link>
            <ul className="navbar-menu">
                <Link
                    className={menu === "home" ? "active" : ""} 
                    onClick={() => handleMenuClick("home")}
                >
                    home
                </Link>
                <a 
                    href='#explore-menu'
                    className={menu === "menu" ? "active" : ""} 
                    onClick={() => handleMenuClick("menu")}
                >
                    menu
                </a>
                <a
                    href='#app-download'
                    className={menu === "mobile-app" ? "active" : ""} 
                    onClick={() => handleMenuClick("mobile-app")}
                >
                    mobile-app
                </a>
                <a
                    href='#footer'
                    className={menu === "contact-us" ? "active" : ""} 
                    onClick={() => handleMenuClick("contact-us")}
                >
                    contact us
                </a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
                :<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Navbar;
