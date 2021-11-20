import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Marketplace from '../pages/Marketplace';
import CreateDivePhoto from '../pages/DivePhotos/CreateDivePhoto';
import { Home } from '../pages/Home';
import MyDivePhotos from '../pages/MyDivePhotos';
import { Settings } from '../pages/Settings';
import UserProfileEdit from '../pages/UserProfileEdit';
import MyProfile from '../pages/Users/MyProfile';
import TopNav from '../TopNav';

const WithNav =({children}) =>{
    return(
        <>
            <TopNav />
            <main>{children}</main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="users">
                {/* <Route path="/" element={<UsersIndex />} /> */}
                {/* <Route path=":id" element={<UserProfile />} /> */}
                <Route path="me" element={<MyProfile />} />
                </Route>
                <Route path="dive_photos">
                <Route path="create" element={<CreateDivePhoto />} />
                </Route>
                <Route path="/profile" element={<UserProfileEdit />} />
                {/* <Route path="/profile/:id/edit" element={<UserProfileEdit />} /> */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/createdivephoto" element={<CreateDivePhoto />} />
                <Route path="/mydivephotos" element={<MyDivePhotos />} />
                <Route path="/marketplace" element={<Marketplace />} />
            </Routes>
        </>
    )
}

export default WithNav;