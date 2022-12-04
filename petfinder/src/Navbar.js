import React from 'react';
import {Link} from "react-router-dom";
import { LogoutPage } from './pages/logoutPage';
import './navbar.css'
import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";

function Navbar() {
    let [user, setUser] = useState(()=> localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)
    let currentUser = setUser;
    console.log( currentUser.username);
    return (

      
        <div class='sidebar'>
            <Link to="/Home">Home</Link>
            <Link to="/Feed">Feed</Link>
            <Link to="/feed">Register</Link>
        
        {/* <Link  onClick={LogoutPage} >Logout</Link> */}
        {/* <Link to="/login">Login</Link> */}
        {/* <Link  onClick={LogoutPage} >Logout</Link> */}

        {user ? (
            <Link  onClick={LogoutPage} >Logout</Link>
        ): (
            <Link to="/login" >Login</Link>
        )}
       
        {user &&   <p>Hello {user.username}</p>}
       
    </div>
        // <Link to="/home">Home</Link>
        // <Link to="/feed">Feed</Link>
        // <Link to="/feed">Register</Link>
        // <Link to="/login">Login</Link>
        // <span> | </span>

        // {user ? (
        //     <Link  onClick={LogoutPage} >Logout</Link>
        // ): (
        //     <Link to="/login" >Login</Link>
        // )}
       
             

        // <div className='sidebar'>
        //     <Link to="/home">Home</Link>
        //     <Link to="/feed">Feed</Link>
        //     <Link to="/feed">Register</Link>
        //     <Link to="/login">Login</Link>
        //  <Link  onClick={LogoutPage} >Logout</Link>
          
         
    
    );
}

export default Navbar