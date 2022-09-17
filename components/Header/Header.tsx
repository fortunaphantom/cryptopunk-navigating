import style from "./header.module.scss";
import { Container } from "@chakra-ui/react";
import { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
} from "@chakra-ui/react";
import { shortenWalletAddress } from "utils/utils";

export default function Header() {
  const { connect, connectors, isLoading } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleConnectButtonClick = () => {
    if (isConnected) {
      disconnect()
    }
    else {
      setModalIsOpen(true)
    }
  }

  const handleConnectWallet = async (wallet: number) => {
    setModalIsOpen(false);
    connect({ connector: connectors[wallet] });
  };

  return (
    <header>
      <Container
        id={style.header}
        maxW={{
          sm: "container.sm",
          md: "container.md",
          lg: "container.lg",
          xl: "container.xl",
        }}
      >
        <div className={style.logo}>
          <Image src="/images/logo.png" alt="logo" />
        </div>
        <Button
          bg={"primary.main"}
          color="white"
          onClick={handleConnectButtonClick}
          leftIcon={<FontAwesomeIcon icon={faWallet} />}
          isLoading={isLoading}
          loadingText="Connecting"
        >
          {isConnected ? shortenWalletAddress(address) : "Connect Wallet"}
        </Button>
      </Container>
      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color={"primary.main"}
            textAlign="center"
            fontSize={"3xl"}
          >
            Connect Wallet
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDirection="column"
            gap={4}
            padding={"12px 24px 24px 24px"}
          >
            <Button
              leftIcon={<Image src="/images/metamask.svg" alt="metamask" height={"32px"} />}
              size={"lg"}
              padding={"24px"}
              bg={"#f7c495"}
              onClick={() => handleConnectWallet(0)}
            >
              Metamask
            </Button>
            <Button
              leftIcon={<Image src="images/coinbase.svg" alt="coinbase" height={"32px"} />}
              padding={"24px"}
              size="lg"
              bg={"#b5cbfb"}
              onClick={() => handleConnectWallet(1)}
            >
              Coinbase
            </Button>
            <Button
              leftIcon={
                <Image src="images/walletconnect.png" alt="walletconnect" height={"32px"} />
              }
              padding={"24px"}
              size="lg"
              bg={"#a9e5d4"}
              onClick={() => handleConnectWallet(2)}
            >
              Wallet Connect
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </header>
  );
}
