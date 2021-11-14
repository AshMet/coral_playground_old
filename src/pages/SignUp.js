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
import { ErrorBox } from '../Error';


export default function SignUp() {
    const { authenticate, isAuthenticating, authError, signup } = useMoralis();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        {authError && ( <ErrorBox title="Authentication Failed" message={authError.message} /> )}
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign up for a new account</Heading>
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
                <Button
                  onClick={() => signup(email, password, email)}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign Up with Email
                </Button>
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