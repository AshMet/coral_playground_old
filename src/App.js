import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import UserProfileEdit from './pages/UserProfileEdit'
import { Settings } from './pages/Settings'
import SignUp from './pages/SignUp'
import TopNav from './TopNav'
import CreateDivePhoto from './pages/CreateDivePhoto'
import MyDivePhotos from './pages/MyDivePhotos'

import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {

  return (
    <>
      <TopNav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfileEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createdivephoto" element={<CreateDivePhoto />} />
          <Route path="/mydivephotos" element={<MyDivePhotos />} />
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
