import { UnorderedList, ListItem, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useMoralisCloudFunction } from "react-moralis";
import DivePhotoDetails from "./DivePhotos/DivePhotoDetails";


export default function MyDivePhotos() { 

    const { data : ownedNFTs, error, isLoading } = useMoralisCloudFunction("getUserNFTs");
    // const [ ownedNFTs, setOwnedNFTs ] = useState();

    // useEffect(() => {
    //     if (!data) return null;
    //     setOwnedNFTs(data);
    // }, [data])


    if (error) {
        return <span>🤯</span>;
    }
    
    if (isLoading) {
        return <span>🙄</span>;
    }
    
    if (ownedNFTs && ownedNFTs.length > 0) {
          
        return (
           ownedNFTs.map((nft) =>
                <DivePhotoDetails nft={nft} />).reverse()
        )

    } else { return <Text> Nothing to Display</Text> }

}