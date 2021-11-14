import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  VStack,
  Text,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { IoLogOutOutline, IoChevronDown, IoWalletOutline, IoLogInOutline } from "react-icons/io5"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useMoralis } from "react-moralis"
import { Settings } from './pages/Settings';
import { Signup } from './pages/SignUp';

const Links = ['Home', 'Profile', 'SignUp', 'CreateNFT'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={children}>
    {children}
  </Link>
);

export default function TopNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout, user, isAuthUndefined, isAuthenticating, authenticate } = useMoralis();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Coral Playground</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
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
          { !isAuthenticated && 
            <Stack direction="row" spacing={4}>
              <IconButton
                isLoading={isAuthenticating} onClick={() => authenticate()}
                size="lg"
                variant="ghost"
                aria-label="Connect Wallet"
                icon={<IoWalletOutline />}
              />
              {/* Links are  not working here yet */}
              <Link to="/signin">
                <Button leftIcon={<IoLogInOutline />} colorScheme="teal" variant="solid">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button leftIcon={<IoLogInOutline />} colorScheme="teal" variant="outline">
                  Sign Up
                </Button>
              </Link>
            </Stack>
          }
          { isAuthenticated && 
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: 'none' }}>
                  <HStack>
                    { isAuthenticated && 
                      <Avatar
                        name={user.attributes.username }
                        size={'sm'}
                      />
                    }
                    <VStack
                      display={{ base: 'none', md: 'flex' }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2">
                      <Text fontSize="sm">{user && user.attributes.username }</Text>
                      <Text fontSize="xs" color="gray.600">
                        Admin
                      </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                      <IoChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem><Link to="Profile">Profile</Link></MenuItem>
                  <MenuItem><Link to="Settings">Settings</Link></MenuItem>
                  <MenuDivider />
                  <MenuItem><Button
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
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}