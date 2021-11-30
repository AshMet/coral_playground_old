import { Container, Flex, Text, Box, chakra, Button, Stack, Link, useColorModeValue } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { IoWalletOutline } from "react-icons/io5"
import { FaBitcoin } from "react-icons/fa";


export const Home = () => {

    const { isAuthenticated, user } = useMoralis();
    
    return(
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'url(https://miro.medium.com/max/1838/1*nLDCAvHPZ4IHlnNjQ9J0QA.jpeg)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <Container pt={10}>
        <Flex
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
            mx="auto"
            px={8}
            py={4}
            rounded="lg"
            shadow="lg"
            bg={useColorModeValue("white", "gray.800")}
            opacity={0.8}
            maxW="2xl"
            >
            <Flex justifyContent="space-between" alignItems="center">
                <chakra.span
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
                >
                {/* Mar 10, 2019 */}
                </chakra.span>
                <Link
                px={3}
                py={1}
                bg="red.600"
                color="gray.100"
                fontSize="sm"
                fontWeight="700"
                rounded="md"
                _hover={{ bg: "red.500" }}
                >
                Beta
                </Link>
            </Flex>
    
            <Box mt={2}>
                <Text
                fontSize="2xl"
                align="center"
                color={useColorModeValue("gray.700", "white")}
                fontWeight="700"
                >
                { isAuthenticated ? `Welcome to Coral Playground ${user && user.attributes.username}` : "Coral Playground" }
                </Text>
                <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
                Coral playground is an NFT marketplace for underwater photographers to sell their work with a portion of the sale 
                going to benefit marine preservation and coral regeneration initiatives. Divers will also be able to commemorate 
                dives booked through the platform with NFT rewards, incentivizing booking with participating businesses and 
                creating a wealth of data related to underwater conditions and marine life.
                </chakra.p>
            </Box>
    
            <Flex justifyContent="center" alignItems="center" mt={4}>
                <Stack direction='row' spacing={4}>
                    <Button leftIcon={<IoWalletOutline />} colorScheme='teal' variant='solid'>
                        Connect Wallet
                    </Button>
                    <Button rightIcon={<FaBitcoin />} colorScheme='teal' variant='outline'>
                        Buy Crypto
                    </Button>
                </Stack>
            </Flex>
            </Box>
        </Flex>
    </Container>
    </Flex>
    )
}