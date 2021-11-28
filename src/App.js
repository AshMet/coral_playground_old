import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import UserProfileEdit from './pages/UserProfileEdit'
import { Settings } from './pages/Settings'
import SignUp from './pages/SignUp'
import TopNav from './TopNav'
import CreateDivePhoto from './pages/DivePhotos/CreateDivePhoto'
import MyDivePhotos from './pages/MyDivePhotos'
import ViewDivePhoto from './pages/DivePhotos/ViewDivePhoto'
import Marketplace from './pages/Marketplace'
import ViewProfile from './pages/Users/ViewProfile'
import LogIn from './pages/LogIn'

import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {

  return (
    <>
      <TopNav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dive_photos">
            <Route path="create" element={<CreateDivePhoto />} />
            {/* <Route path=":id" element={<ViewDivePhoto />} /> */}
          </Route>
          <Route path="profile" element={<UserProfileEdit />} />
          {/* <Route path="/profile/:id/edit" element={<UserProfileEdit />} /> */}
          <Route path="user/settings" element={<UserProfileEdit />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="createdivephoto" element={<CreateDivePhoto />} />
          <Route path="mydivephotos" element={<MyDivePhotos />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="divephoto/:uid" element={<ViewDivePhoto />} />
          <Route path="user/me" element={<ViewProfile />} />
      </Routes>
      
      {/* { isAuthenticated ? 
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
        </Routes> 
      : <>
          { isAuthUndefined && (<Navigate to="/" />) }
          <Auth />
        </> } */}
    </>
  );

}

export default App;
