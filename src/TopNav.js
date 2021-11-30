import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  VStack,
  Text,
  IconButton,
  Button,
  Menu,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { IoLogOutOutline, IoChevronDown, IoWalletOutline, IoLogInOutline } from "react-icons/io5"
import { FaBitcoin } from "react-icons/fa";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useMoralis } from "react-moralis"
import { Settings } from './pages/Settings';
import { Signup } from './pages/SignUp';
import { useNavigate } from 'react-router';

// const Links = ['Home', 'Profile', 'SignUp', 'CreateDivePhoto', 'MyDivePhotos', 'Marketplace'];


const NavLink = (props) => (
  <Link
    px={2}
    py={1}
    color={useColorModeValue('gray.100', 'gray.200')}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('pink.600', 'pink.600'),
    }}
    href={props.link}>
    {props.title}
  </Link>
);

export default function TopNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout, user, isAuthUndefined, isAuthenticating, authenticate, Moralis } = useMoralis();
  let navigate = useNavigate();


  const getFiat = async function () {
    Moralis.initPlugins()
    await Moralis.Plugins.fiat.buy()
  }

  return (
    <Box bg={useColorModeValue('purple.900', 'purple.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold" color={useColorModeValue('pink.400', 'pink.600')}>Coral Playground</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
              <NavLink link='/' title='Home' />
              <NavLink link='marketplace' title='Marketplace' />
              <NavLink link='nftdrops' title='NFT Drops' />
              { isAuthenticated && <NavLink link='divephotos/create' title='Create NFT' /> }
              { isAuthenticated && <NavLink link='mydivephotos' title='My Dive Photos' /> }
              }
            {/* {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))} */}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuList>
              <MenuItem>Link 1</MenuItem>
              <MenuItem>Link 2</MenuItem>
              <MenuDivider />
              <MenuItem>Link 3</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            onClick={() => getFiat()}
            colorScheme={'teal'}
            size="lg"
            variant="ghost"
            aria-label="Buy Crypto"
            icon={<FaBitcoin />}
          />
          { !isAuthenticated ? 
            <Stack direction="row" spacing={4}>
              <IconButton
                isLoading={isAuthenticating} 
                onClick={() => authenticate()}
                colorScheme={'teal'}
                size="lg"
                variant="ghost"
                aria-label="Connect Wallet"
                icon={<IoWalletOutline />}
              />
              {/* Links are  not working here yet */}
              <Link href="login">
                <Button leftIcon={<IoLogInOutline />} colorScheme="teal" variant="solid">
                  Log In
                </Button>
              </Link>
              <Link href="signup">
                <Button leftIcon={<IoLogInOutline />} colorScheme="teal" variant="outline">
                  Sign Up
                </Button>
              </Link>
            </Stack>
          : <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    <Avatar
                      name={user.attributes.username }
                      src={user.attributes?.avatar?._url}
                      size={'sm'}
                    />
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2">
                      <Text fontSize="sm" color="gray.200">{user && user.attributes.username }</Text>
                      <Text fontSize="xs" color="gray.400">
                        User
                      </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <IoChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem><Link href={`/user/me`}>Profile</Link></MenuItem>
                  {/* onClick={ () => navigate(`/divephoto/${props.nft.uid}`)} */}
                  <MenuItem><Link href="profile">Settings</Link></MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Button
                      onClick={() => logout()}
                      variant={'link'}
                      colorScheme={'teal'}
                      size={'sm'}
                      mr={4}
                      rightIcon={<IoLogOutOutline />}>
                      Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          }
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink link='/' title='Home' />
            <NavLink link='profile' title='Profile' />
            <NavLink link='signup' title='Signup' />
            <NavLink link='divephoto/create' title='Create NFT' />
            <NavLink link='mydivephotos' title='My Dive Photos' />
            <NavLink link='marketplace' title='Marketplace' />
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}