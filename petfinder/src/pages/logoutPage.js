

import React from "react";
import axios from "axios";
import { setAuthToken } from "../context/setAuthToken"

export const LogoutPage = () => {

 
    setAuthToken(null)
    localStorage.removeItem('token')
    window.location.href = '/login'



};
