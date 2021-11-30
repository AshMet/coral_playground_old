import { Text, Grid, Box, Container } from "@chakra-ui/react";
import { useMoralisCloudFunction } from "react-moralis";
import MarketplaceCard from "../components/MarketplaceCard";

export default function MyDivePhotos() {

    const { data : marketplaceNFTs, error, isLoading } = useMoralisCloudFunction("getMarketplaceNFTs");

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
            <Container maxW={'full'}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    {marketplaceNFTs.map((nft) =>
                        <MarketplaceCard nft={nft} />)}
                </Grid>
            </Container>
        )

        // for (var i = 0; i < marketplaceNFTs.length; i++) {
        //     var MarketplaceNFT = marketplaceNFTs[i];
        //     return(<MarketplaceCard item={MarketplaceNFT} />)
        //  }
         
      } else { return <Text> Nothing to Display </Text>}

}