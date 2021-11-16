import { Container, Flex, Box, chakra, Image, Link, useColorModeValue } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"


export const Home = () => {

    const { isAuthenticated, user } = useMoralis();
    
    return(
      <Container pt={10}>
        <Flex
            bg={useColorModeValue("#F9FAFB", "gray.600")}
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
                <Link
                
                fontSize="2xl"
                color={useColorModeValue("gray.700", "white")}
                fontWeight="700"
                _hover={{
                    color: useColorModeValue("gray.600", "gray.200"),
                    textDecor: "underline",
                }}
                >
                { isAuthenticated ? `Welcome to Coral Playground ${user && user.attributes.username}` : "Please connect wallet to begin" }
                </Link>
                <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
                Coral playground is an NFT marketplace for underwater photographers to sell their work with a portion of the sale 
                going to benefit marine preservation and coral regeneration initiatives. Divers will also be able to commemorate 
                dives booked through the platform with NFT rewards, incentivizing booking with participating businesses and 
                creating a wealth of data related to underwater conditions and marine life.
                </chakra.p>
            </Box>
    
            <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Link
                color={useColorModeValue("brand.600", "brand.400")}
                _hover={{ textDecor: "underline" }}
                >
                {/* Read more */}
                </Link>
    
                <Flex alignItems="center">
                <Image
                    mx={4}
                    w={10}
                    h={10}
                    rounded="full"
                    fit="cover"
                    display={{ base: "none", sm: "block" }}
                    src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80"
                    alt="avatar"
                />
                <Link
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontWeight="700"
                    cursor="pointer"
                >
                    Ash Met
                </Link>
                </Flex>
            </Flex>
            </Box>
        </Flex>
    </Container>
    )
}