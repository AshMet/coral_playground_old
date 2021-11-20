import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Select,
    Button,
    VStack,
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
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { ErrorBox } from '../../Error';
import { tokenContractAbi, marketplaceContractAbi } from '../../abi';
import ReactFileReader from 'react-file-reader';
import { useNavigate } from "react-router-dom";

export default function CreateDivePhoto() {
    const { user, Moralis } = useMoralis();
    // const { saveFile, moralisFile } = useMoralisFile();
    const { object, isSaving, error, save } = useNewMoralisObject('DivePhoto');
    const [ name, setNFTname ] = useState();
    const [ description, setNFTdescription ] = useState();
    const [ price, setNFTprice ] = useState();
    const [ status, setNFTstatus ] = useState();
    const [ image, setImage ] = useState();
    const [ imgData, setImgData] = useState();

    let navigate = useNavigate();

    const nftContractAddress = '0x6201e4cb3441205062CbDb0eCA9B3F378031F1b8';
    const marketplaceContractAddress = '0x1f02a40a52f05655dd1d3599761514cE18911B71';

    useEffect(() => {
        if (!object) return null;
        setNFTname(object.nftName)
        setNFTprice(object.nftPrice)
        setNFTdescription(object.nftDescription)
        setImage(object.image);
        // setNFTfile(object.attributes?.nftFile?._url);
    }, [object])

    const onChangePhoto = (e) => {
        setImage(e.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSave = async (e) => {
        const web3 = await Moralis.enableWeb3()
        const userAddress = user.get('ethAddress')
        const marketplaceContract = new web3.eth.Contract(marketplaceContractAbi, marketplaceContractAddress )

        const nftFile = new Moralis.File("DivePhoto.jpg", image)
        await nftFile.saveIPFS()
        const nftFilePath = nftFile.ipfs()
        const nftFileHash = nftFile.hash()

        const metadata = {
            name: name,
            description: description,
            image: nftFilePath
            // nftFileHash: nftFileHash
        }

        const nftMetadata = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))} );
        await nftMetadata.saveIPFS();
        const nftMetadataFilePath = nftMetadata.ipfs();
        const nftMetadataFileHash = nftMetadata.hash();
        const nftId = await mintNFT(nftMetadataFilePath)
        
        await save({ user, name, price, description, nftFilePath, nftFileHash, nftMetadataFilePath, nftMetadataFileHash, status, nftId, nftContractAddress })
        await sendToMarketplace(status, nftId, marketplaceContract, userAddress)
        navigate("/mydivephotos")
    }

    const sendToMarketplace = async (param, nftId, marketplaceContract, userAddress) => {
        switch (param) {
            case "no_sale": 
                return;
            case "insta_buy" : 
                await ensureMarketplaceIsApproved(nftId, nftContractAddress);
                await marketplaceContract.methods.addItemToMarket(nftId, nftContractAddress, price).send({from: userAddress});
                break;
            case "accept_offer":
                alert("Not yet supported");
                return;
            default:
                break;
        }
    };

    const mintNFT = async (metadataUrl) => {
        const web3 = await Moralis.enableWeb3();
        const tokenContract = new web3.eth.Contract(tokenContractAbi, nftContractAddress )

        let receipt = await tokenContract.methods
            .createItem(metadataUrl)
            // .send({ from: user.attributes.ethAddress })
            .send({ from: window.ethereum.selectedAddress })
            // .then((response) => console.log(response))
            // .catch((err) => ErrorBox(err.message));
        
        console.log(receipt)
        return receipt.events.Transfer.returnValues.tokenId;
    };

    const ensureMarketplaceIsApproved = async (tokenId, tokenAddress) => {
        const web3 = await Moralis.enableWeb3();
        const userAddress = user.get('ethAddress');
        const contract = new web3.eth.Contract(tokenContractAbi, tokenAddress );
        const approvedAddress = await contract.methods.getApproved(tokenId).call({from: userAddress})
        if (approvedAddress != marketplaceContractAddress) {
            await contract.methods.approve(marketplaceContractAddress, tokenId).send({from: userAddress})
        }

    };

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
                <VStack align="center" >
                    <Heading>Create your NFT</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                        Add your dive photo below to mint your nft
                    </Text>
                </VStack>
                <Box p={4}>
                    <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                    <WrapItem>
                        <Box>
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
                                        backgroundImage: `url(${imgData || "https://cdn.pixabay.com/photo/2017/04/20/07/08/select-2244784_1280.png"})`,
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
                                        src={imgData || "https://cdn.pixabay.com/photo/2017/04/20/07/08/select-2244784_1280.png"}
                                    />
                                    </Box>
                                    <Stack pt={10} align={'center'}>
                                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} textTransform={'uppercase'}>
                                        {name}
                                    </Heading>
                                    <Text color={'gray.500'} fontSize={'sm'}>
                                        {description}
                                    </Text>
                                    <Stack direction={'row'} align={'center'}>
                                        <Text fontWeight={800} fontSize={'xl'}>
                                        {price} ETH
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
                        <Box bg="white" borderRadius="lg" marginTop="5" >
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
                                    value={name}
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
                                    value={price}
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
                                value={description}
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