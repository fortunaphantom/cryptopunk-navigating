import { Container } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

export default function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        position: 'fixed',
        bottom: '0',
        backgroundColor: "#ea34b0",
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        zIndex: '5'
      }}
    >
      <Container
        maxW={{
          sm: "container.sm",
          md: "container.md",
          lg: "container.lg",
          xl: "container.xl",
        }}
        paddingTop={"8px"}
        paddingBottom={"8px"}
        margin='auto'
      >
        
        <FontAwesomeIcon icon={faCopyright} />
        {' '}2022 CryptoPunks USA, Inc. All rights reserved.
      </Container>
    </footer>
  );
}
