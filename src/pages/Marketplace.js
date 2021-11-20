import { Text } from "@chakra-ui/react";
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
        for (var i = 0; i < marketplaceNFTs.length; i++) {
            var MarketplaceNFT = marketplaceNFTs[i];
            return(<MarketplaceCard item={MarketplaceNFT} />)
         }
      } else { return <Text> Nothing to Display </Text>}

}