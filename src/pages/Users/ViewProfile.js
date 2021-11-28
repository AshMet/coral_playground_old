import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom'
  
  export default function ViewProfile(props) {
  const { user } = useMoralis();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState();

  console.log(avatar)
  useEffect(() => {
    if (!user) return null;
    setUsername(user.get("username"))
    setEmail(user.get("email"))
    setAvatar(user.get("avatar")._url)
  }, [user])

    return (
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://i.pinimg.com/736x/e1/05/80/e1058091c5a76cc25be0d99a493f05df--water-tank-marine-fish.jpg'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={ avatar ||
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                { username }
              </Heading>
              <Text color={'gray.500'}>{email}</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>23k</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
            </Stack>
  
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('#151f21', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              Follow
            </Button>
          </Box>
        </Box>
      </Center>
    );
  }