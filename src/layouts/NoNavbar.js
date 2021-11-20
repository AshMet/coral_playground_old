import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import SignUp from '../pages/SignUp';

const NoNavbar =({children}) =>{
    return( 
    <>
        <main>{children}</main>
        <Routes>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
        </Routes>
    </>
    )
}

export default NoNavbar;