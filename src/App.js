import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Container, Text } from '@chakra-ui/react'
import { Auth } from './Auth'
import { Home } from './pages/Home'
import UserProfileEdit from './pages/UserProfileEdit'
import { Settings } from './pages/Settings'
import SignUp from './pages/SignUp'
import TopNav from './TopNav'
import CreateNTF from './pages/CreateNFT'

import '@fortawesome/fontawesome-free/css/all.min.css'

import { useMoralis,  useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis"

function App() {
  const { isAuthenticated, user, isAuthUndefined, isAuthenticating, enableWeb3, isWeb3Enabled, Moralis, web3 } = useMoralis();
  const TOKEN_CONTRACT_ADDRESS = '0x31bFEc7f6c72726589f5515F9E0BE1c333e1DC55';
  const Web3Api = useMoralisWeb3Api()
  const { native: { getBlock }, account: { getNativeBalance } } = useMoralisWeb3Api();

  const getNativeBalanceQuery = useMoralisWeb3ApiCall(getNativeBalance, {
    address: TOKEN_CONTRACT_ADDRESS,
  });

  // console.log(getNativeBalanceQuery);
  // console.log(getNativeBalance);
  console.log(web3);
  console.log(Web3Api);
  debugger
  // console.log(await Moralis.Web3API.account.getNativeBalance({chain:"0x61",address:TOKEN_CONTRACT_ADDRESS}));
  return (
    <>
      <TopNav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfileEdit />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/createnft" element={<CreateNTF />} />
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
