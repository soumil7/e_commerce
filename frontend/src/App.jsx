import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import {Route, Routes} from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className = 'app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/cart' element={<Cart/>}/>
        <Route path = '/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
      <Footer/>
      </div>
    </>
  )
}

export default App;
