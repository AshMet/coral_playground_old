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
                <DivePhotoDetails tokenId={nft.tokenId} tokenAddress={nft.tokenAddress} symbol={nft.symbol} tokenUri={nft.tokenUri} />)
        )
        
        // for (var i = 0; i < ownedNFTs.length; i++) {
        //     var nft = ownedNFTs[i];
        //     return(<NFTcard tokenId={nft.tokenId} tokenAddress={nft.tokenAddress} symbol={nft.symbol} tokenUri={nft.tokenUri} />)
        // }
      } else { return <Text> Nothing to Display</Text> }


    // const cardList = function () => {
    //     for (var i = 0; i < ownedNFTs.length; i++) {
    //         var nft = ownedNFTs[i];
    //         return(<NFTcard tokenId={nft.tokenId} tokenAddress={nft.tokenAddress} symbol={nft.symbol} tokenUri={nft.tokenUri} />)
    //     }
    // }

}

// Moralis.Cloud.define("getUserNFTs", async (request) => {
//     // console.log(request);
//     const query = new Moralis.Query("EthNFTTransfers");
//     query.equalTo("contract_type", "ERC721");
//     query.containedIn("owner_of", request.user.attributes.accounts);
//     const queryResults = await query.find();
//     const results = [];
    
//     for (let i = 0; i < queryResults.length; ++i) {
//       results.push({
//           "id": queryResults[i].attributes.objectId,
//             "tokenId": queryResults[i].attributes.token_id,
//             "tokenAddress": queryResults[i].attributes.token_address,
//             "symbol": queryResults[i].attributes.symbol,
//             "tokenUri": queryResults[i].attributes.token_uri
//       });
//     }
//     return results;
//   };