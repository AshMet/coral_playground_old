import { Text, Grid, Box } from "@chakra-ui/react";
import { useMoralisCloudFunction } from "react-moralis";
import MarketplaceCard from "../components/MarketplaceCard";

export default function MyDivePhotos() {

    const { data : marketplaceNFTs, error, isLoading } = useMoralisCloudFunction("getMarketplaceNFTs");
    // const [ marketplaceNFTs, setmarketplaceNFTs ] = useState();

    // useEffect(() => {
    //     if (!data) return null;
    //     setmarketplaceNFTs(data);
    // }, [data])


    if (error) {
        return <span>🤯</span>;
    }
    
    if (isLoading) {
        return <span>🙄</span>;
    }
    
    if (marketplaceNFTs && marketplaceNFTs.length > 0) {

        // Create user filtering on front-end instead of cloud function
        // if(user){
        //     if(user.ttributes.accounts.includes(item.ownerOf)) return;
        // }

        return (
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                 {marketplaceNFTs.map((nft) =>
                    <MarketplaceCard nft={nft} />)}
            </Grid>
        )

        // for (var i = 0; i < marketplaceNFTs.length; i++) {
        //     var MarketplaceNFT = marketplaceNFTs[i];
        //     return(<MarketplaceCard item={MarketplaceNFT} />)
        //  }
         
      } else { return <Text> Nothing to Display </Text>}

}


{/* <SimpleGrid
    bg="gray.50"
    columns={{ sm: 2, md: 4 }}
    spacing="8"
    p="10"
    textAlign="center"
    rounded="lg"
    color="gray.400"
>
    { marketplaceNFTs.for( nft => {
        <Box boxShadow="xs" p="6" rounded="md" bg="white">
            <MarketplaceCard item={nft} />
        </Box>
    })
    }

</SimpleGrid> */}