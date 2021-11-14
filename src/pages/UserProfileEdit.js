import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Text,
    Box
  } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import { ErrorBox } from "../Error";
import { useNavigate } from 'react-router-dom';
 
export default function UserProfileEdit(): JSX.Element {
  const { user, setUserData, userError, isUserUpdating } = useMoralis();
  const { saveFile, moralisFile } = useMoralisFile();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [photoFileName, setPhotoFileName] = useState();
  const [profilePic, setProfilePic] = useState();
  const navigate = useNavigate()

  useEffect(() => {
      if (!user) return null;
      setUsername(user.get("username"))
      setEmail(user.get("email"))
      // getAvatar(user.get("avatar"))
      setProfilePic(user.attributes?.profilePic?._url);
  }, [user])

  const onChangePhoto = (e) => {
    setPhotoFile(e.target.files[0]);
    setPhotoFileName(e.target.files[0].name);
  };

  const submitPhoto = async (e) => {
    const file = photoFile;
    const name = photoFileName;
    let fileIpfs = await saveFile(name, file, { saveIPFS: true });
    user.set("profilePic", fileIpfs);
    await user.save();
    setProfilePic(user.attributes.profilePic._url);
  };


  const handleSave = () => {
      setUserData({
          username,
          email,
          password: password === "" ? undefined : password
      })
      submitPhoto()
  }
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        {userError && <ErrorBox title="User Change Failed" message={userError.message}></ErrorBox>}
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={profilePic}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Input type="file"
              accept="image/*"
              w="full"
              multiple={false}
              id="profilePhoto"
              onChange={onChangePhoto} />
              {/* <Button w="full">Change Avatar</Button> */}
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            // onClick={ navigate('/home') }
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            isLoading={ isUserUpdating }
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}