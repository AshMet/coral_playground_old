import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { ErrorBox } from '../Error';


export default function LogIn() {
    const { login, logout, authenticate, isAuthenticating, authError, isAuthenticated } = useMoralis()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    let navigate = useNavigate();

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        {authError && ( <ErrorBox title="Authentication Failed" message={authError.message} /> )}
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Log in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder="Email" value={email} onChange={(event)=> setEmail(event.currentTarget.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Password" type="password" value={password} onChange={(event)=> setPassword(event.currentTarget.value)} />
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  marginBottom={5}
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                { isAuthenticated ? 
                  <Button
                    onClick={ () => {logout(); navigate('/')} }
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500' }}>
                    Log Out
                  </Button>
                : <Button
                    onClick={() => {login(email, password); navigate('/')}}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500' }}>
                    Log In
                  </Button>}
                
                <Text align={'center'} my={2}> OR </Text>
                <Button
                  isLoading={isAuthenticating}
                  onClick={() => authenticate()}
                  bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Connect Wallet
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
}