import { Container, Text } from "@chakra-ui/layout";
import { useMoralis } from "react-moralis"


export const Home = () => {

    const { isAuthenticated, user } = useMoralis();
    
    return(
      <Container pt={10}>
      { isAuthenticated ? 
        <Text mb={6}> Welcome to Coral Playground {user && user.attributes.username } </Text> 
      : "Please connect wallet to begin"
      }
    </Container>
    )
}