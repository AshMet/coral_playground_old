// import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { marketplaceContractAbi } from '../abi';

export default function MarketplaceCard(props) {
    const { user, Moralis } = useMoralis();
    let navigate = useNavigate();
    const marketplaceContractAddress = '0x7733E6fb52bBD3C878A37AdcdD1C0B52578cbFd1';

    const [ isLoading, setLoading ] = useState(true);
    const [ isMinting, setMinting ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState();

    useEffect(() => {
      async function getNFTurl() {
        try {
          let response = await fetch(props.nft.tokenUri);
          let responseJson = await response.json();
          setImageUrl(responseJson.image);
        } catch(error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      getNFTurl();
    }, []);

    const buyNFT = async function (nft) {
        const web3 = await Moralis.enableWeb3()
        const userAddress = user.get('ethAddress')
        const marketplaceContract = new web3.eth.Contract(marketplaceContractAbi, marketplaceContractAddress )

        if(!user) {
            navigate('login')
            return;
            // Need to add a notification box after navigation
        }
        await marketplaceContract.methods.buyItem(nft.uid).send({from: userAddress, value: nft.askingPrice})
    }

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={ imageUrl }
            isLoading={ isLoading }
            layout={'fill'}
            onClick={ () => navigate(`/divephoto/${props.nft.uid}`)}
          />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            {`Item ID: ${props.nft.uid}`}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {props.nft.name}
          </Heading>
          <Text color={'gray.500'}>
            {props.nft.description}
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar
            src={props.nft.sellerAvatar?._url}
            alt={'Author'}
          />
          <Stack direction={'column'} spacing={2} fontSize={'sm'}>
            <Text fontWeight={600}>{props.nft.sellerUsername}</Text>
            <Text color={'gray.500'}>Feb 08, 2021</Text>
            <Button
                onClick={ () => buyNFT(props.nft) }
                isLoading={ isMinting }
                // disabled={ isSaving }
                variant="solid"
                bg="#0D74FF"
                color="white"
                _hover={{}}>
                {`Buy now for ${props.nft.askingPrice} ETH`}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}