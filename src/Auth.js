import { Button, Input, Text, Stack } from '@chakra-ui/react'
import { useState } from 'react';
import { useMoralis } from "react-moralis";
import { ErrorBox } from './Error';


const SignUp = () => {
    const { signup } = useMoralis()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
  
    return (
      <Stack spacing={3}>
        <Input placeholder="Email" value={email} onChange={(event)=> setEmail(event.currentTarget.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(event)=> setPassword(event.currentTarget.value)} />
        <Button onClick={() => signup(email, password, email)}> Sign Up with Email </Button>
      </Stack>
    )
}
  
  const LogIn = () => {
    const { login, logout } = useMoralis()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const { isAuthenticated } = useMoralis();
  
    return (
      <Stack spacing={3}>
        <Input placeholder="Email" value={email} onChange={(event)=> setEmail(event.currentTarget.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(event)=> setPassword(event.currentTarget.value)} />
        {isAuthenticated ? <Button onClick={() => logout()}> Log Out </Button> : <Button onClick={() => login(email, password)}> Log In </Button>}
      </Stack>
    )
}


export const Auth = () => {
  const { authenticate, isAuthenticating, authError } = useMoralis();

    return (
        <Stack spacing={6}>
            {authError && ( <ErrorBox title="Authentication Failed" message={authError.message} /> )
            }
            <Button isLoading={isAuthenticating} onClick={() => authenticate()}> Connect Wallet </Button>
            <Text textAlign="center"><em> or </em></Text>
            <SignUp />
            <Text textAlign="center"><em> or </em></Text>
            <LogIn />
        </Stack>
    )
}