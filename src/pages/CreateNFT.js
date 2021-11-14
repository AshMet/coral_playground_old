import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Select,
    Button,
    VStack,
    HStack,
    Stack,
    useColorModeValue,
    Image,
    Center,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
  } from '@chakra-ui/react';
  import {
    MdOutlineEmail,
  } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { useState, useEffect } from "react";
import { useMoralis, useMoralisFile, useNewMoralisObject } from "react-moralis";
import { ErrorBox } from '../Error';
import { Navigate } from "react-router-dom";

export default function CreateNTF() {
    const { user, setUserData, userError, isUserUpdating } = useMoralis();
    const { saveFile, moralisFile } = useMoralisFile();
    const { object, isSaving, error, save } = useNewMoralisObject('DivePhoto');
    const [ nftname, setNFTname ] = useState();
    const [ nftprice, setNFTprice ] = useState();
    const [ nftdescription, setNFTdescription ] = useState();
    const [ nftStatus, setNFTstatus ] = useState();
    const [ photoFile, setPhotoFile ] = useState();
    const [ photoFileName, setPhotoFileName ] = useState();
    const [ nftFile, setNFTfile ] = useState();

    // const navigate = Navigate();

    useEffect(() => {
        if (!object) return null;
        setNFTname(object.nftname)
        setNFTprice(object.nftprice)
        setNFTdescription(object.nftdescription)
        setNFTfile(object.attributes?.nftFile?._url);
    }, [object])

    const onChangePhoto = (e) => {
        setPhotoFile(e.target.files[0]);
        setPhotoFileName(e.target.files[0].name);
    };

    const handleSave = async (e) => {
        const file = photoFile;
        const name = photoFileName;
        let nftFile = await saveFile(name, file, { saveIPFS: true });
        await save({ user, nftname, nftprice, nftdescription, nftFile, nftStatus })
        // Navigate("/Home")
    }

    return (
        <Container maxW="full" mt={0} centerContent overflow="hidden">
            {error && <ErrorBox error={error} />}
            <Flex>
                <Box
                bg="#02054B"
                color="white"
                borderRadius="lg"
                m={{ sm: 4, md: 16, lg: 10 }}
                p={{ sm: 5, md: 5, lg: 16 }}>
                <Box p={4}>
                    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                    <WrapItem>
                        <Box>
                            <Heading>Create your NFT</Heading>
                            <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                Fill up the form below to mint your NFT
                            </Text>
                            <Center py={12}>
                                <Box
                                    role={'group'}
                                    p={6}
                                    maxW={'330px'}
                                    w={'full'}
                                    bg={useColorModeValue('white', 'gray.800')}
                                    boxShadow={'2xl'}
                                    rounded={'lg'}
                                    pos={'relative'}
                                    zIndex={1}>
                                    <Box
                                    rounded={'lg'}
                                    mt={-12}
                                    pos={'relative'}
                                    height={'230px'}
                                    _after={{
                                        transition: 'all .3s ease',
                                        content: '""',
                                        w: 'full',
                                        h: 'full',
                                        pos: 'absolute',
                                        top: 5,
                                        left: 0,
                                        backgroundImage: `url('https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80')`,
                                        filter: 'blur(15px)',
                                        zIndex: -1,
                                    }}
                                    _groupHover={{
                                        _after: {
                                        filter: 'blur(20px)',
                                        },
                                    }}>
                                    <Image
                                        rounded={'lg'}
                                        height={230}
                                        width={282}
                                        objectFit={'cover'}
                                        src={nftFile}
                                    />
                                    </Box>
                                    <Stack pt={10} align={'center'}>
                                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                                        Title
                                    </Text>
                                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                        Subtitle
                                    </Heading>
                                    <Stack direction={'row'} align={'center'}>
                                        <Text fontWeight={800} fontSize={'xl'}>
                                        $57
                                        </Text>
                                        <Text textDecoration={'line-through'} color={'gray.600'}>
                                        $199
                                        </Text>
                                    </Stack>
                                    <Input type="file"
                                        accept="image/*"
                                        w="full"
                                        multiple={false}
                                        id="profilePhoto"
                                        onChange={onChangePhoto} />
                                        {/* <Button w="full">Change Avatar</Button> */}
                                    </Stack>
                                </Box>
                            </Center>            
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box bg="white" borderRadius="lg">
                        <Box m={8} color="#0B0E3F">
                            <VStack spacing={5}>
                            <FormControl id="nftname">
                                <FormLabel>Name</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<BsPerson color="gray.800" />}
                                />
                                <Input
                                    size="md"
                                    value={nftname}
                                    onChange={(event) => setNFTname(event.currentTarget.value)}
                                    placeholder="Name"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="nftprice">
                                <FormLabel>Price</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdOutlineEmail color="gray.800" />}
                                />
                                <Input
                                    size="md"
                                    value={nftprice}
                                    onChange={(event) => setNFTprice(event.currentTarget.value)}
                                    placeholder="Price"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="nftdescription">
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                value={nftdescription}
                                onChange={(event) => setNFTdescription(event.currentTarget.value)}
                                borderColor="gray.300"
                                _hover={{
                                    borderRadius: 'gray.300',
                                }}
                                placeholder="message"
                                />
                            </FormControl>
                            <FormControl>
                                <Select placeholder="Select Status" onChange={(event) => setNFTstatus(event.currentTarget.value)} >
                                    <option value="no_sale">Not For Sale</option>
                                    <option value="insta_buy">Instant Buy</option>
                                    <option value="accept_offer">Accept Offers</option>
                                </Select>
                            </FormControl>
                            <FormControl float="right">
                            <Button
                                onClick={handleSave}
                                isLoading={ isSaving }
                                disabled={ isSaving }
                                variant="solid"
                                bg="#0D74FF"
                                color="white"
                                _hover={{}}>
                                Mint NFT
                            </Button>
                            </FormControl>
                            </VStack>
                        </Box>
                        </Box>
                    </WrapItem>
                    </Wrap>
                </Box>
                </Box>
            </Flex>
        </Container>
    );
}