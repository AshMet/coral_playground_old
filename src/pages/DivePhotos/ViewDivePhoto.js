import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Divider,
    Icon,
    VStack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import {
    IoAnalyticsSharp,
    IoLogoBitcoin,
    IoSearchSharp,
  } from 'react-icons/io5';
  import { FaUserCheck } from 'react-icons/fa'
  import { ReactElement, useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom'
  import { useMoralisQuery } from 'react-moralis'
  
  interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
  }
  
  const Feature = ({ text, icon, iconBg }: FeatureProps) => {
    return (
      <Stack direction={'row'} align={'center'}>
        <Flex
          w={8}
          h={8}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  
  export default function ViewDivePhoto() {
    let params = useParams()
    const [ name, setNFTname ] = useState();
    const [ description, setNFTdescription ] = useState();
    const [ imageUrl, setImageUrl ] = useState();

    const { data, error, isLoading } = useMoralisQuery("DivePhotosForSale", query =>
        query.equalTo("uid", `${params.uid}`).select("uid", "tokenAddress", "tokenId", "askingPrice", "token.token_uri", "token.symbol", "token.owner_of", "user.username", "user.avatar" )
    );

    useEffect(() => {
      if (!data) return null;
      async function getNFTurl() {
        try {
          let response = await fetch(data[0]?.attributes?.token?.attributes?.token_uri);
          let responseJson = await response.json();
          setNFTname(responseJson.name);
          setNFTdescription(responseJson.description);
          setImageUrl(responseJson.image);
        } catch(error) {
          console.error(error);
        }
      }
      getNFTurl();
    }, [data])

    if (error) {
    return <span>🤯</span>;
    }

    if (isLoading) {
    return <span>🙄</span>;
    }

    return (
      <Container maxW={'5xl'} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'blue.400'}
              fontWeight={600}
              fontSize={'sm'}
            //   bg={useColorModeValue('blue.50', 'blue.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}>
              {`Token #${params.uid}`}
            </Text>
            <Heading>
              <Text casing='uppercase'>{ name }</Text>
            </Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
            
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                //   borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }>
              <Feature
                icon={
                  <Icon as={ FaUserCheck } color={'yellow.500'} w={5} h={5} />
                }
                // iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={ data ? `Seller name: ${data[0]?.attributes?.user?.id}` : 'N/A'}
              />
              <Feature
                icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
                // iconBg={useColorModeValue('green.100', 'green.900')}
                text={ data ? `Token ID: ${data[0]?.attributes?.token?.id}` : 'N/A'}
              />
              <Feature
                icon={
                  <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
                }
                // iconBg={useColorModeValue('purple.100', 'purple.900')}
                text={ data ? `Token Created: ${data[0]?.attributes?.token?.attributes?.createdAt}` : 'N/A'}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              isLoading={isLoading}
              src={ imageUrl }
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
        <VStack marginY={10}>
          <Divider marginBottom={10} />
          <Text as='b'>Description</Text>
          <Text casing='capitalize'>{ description }</Text>
        </VStack>
      </Container>
    );
  }