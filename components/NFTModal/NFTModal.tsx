import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tag,
  TagLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { shortenWalletAddress } from "utils/utils";

interface NFTProps {
  item: NFTItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function NFTModal({ item, isOpen, onClose }: NFTProps) {
  const toast = useToast()

  // Copy topen address to clipboard
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(item.token_address)
    toast({
      description: 'Address Copied',
      position: 'top',
      status: "success"
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={"90%"} maxWidth={"800px"}>
        <ModalHeader color={"primary.main"} textAlign="center" fontSize={"3xl"}>
          Crypto Punks
        </ModalHeader>
        <ModalBody
          display={"flex"}
          flexWrap="wrap"
          gap={6}
          padding={"12px 24px 24px 24px"}
        >
          <Box width={{ sm: "100%", md: "40%" }} flexGrow="1">
            <img src={item.metadata.image} alt="nft" width={"100%"} />
          </Box>
          <Box width={{ sm: "100%", md: "40%" }} flexGrow="1">
            <Flex margin={"12px 0"}>
              <Heading as="h3" size="md">
                Name
              </Heading>
              <Spacer />
              <Text fontSize="md" color={"primary.main"} fontWeight="bold">
                {item.name}
              </Text>
            </Flex>

            <Flex margin={"12px 0"}>
              <Heading as="h3" size="md">
                Symbol
              </Heading>
              <Spacer />
              <Text fontSize="md" color={"primary.main"} fontWeight="bold">
                {item.symbol}
              </Text>
            </Flex>

            <Flex margin={"12px 0"}>
              <Heading as="h3" size="md">
                TokenId
              </Heading>
              <Spacer />
              <Text fontSize="md" color={"primary.main"} fontWeight="bold">
                {item.token_id}
              </Text>
            </Flex>

            <Flex margin={"12px 0"}>
              <Heading as="h3" size="md">
                Gender
              </Heading>
              <Spacer />
              <Text fontSize="md" color={"primary.main"} fontWeight="bold">
                {item.metadata.description}
              </Text>
            </Flex>

            <Flex margin={"12px 0"} fontSize="12px">
              <Heading as="h3" size="md">
                Address
              </Heading>
              <Spacer />
              <Text fontSize="md" color={"primary.main"} fontWeight="bold">
                {shortenWalletAddress(item.token_address)}
              </Text>
              <Text
                fontSize="md"
                color={'lightblue'}
                fontWeight="bold"
                marginLeft={"8px"}
                cursor='pointer'
                onClick={handleCopyAddress}
              >
                <FontAwesomeIcon icon={faClone} size="xs" />
              </Text>
            </Flex>
            
            <Heading as="h3" size="md" marginBottom={'8px'}>
              Attributes
            </Heading>
            <Flex gap={2} flexWrap='wrap'>
              {item.metadata?.attributes?.map((attr: any) => (
                <Tag
                  size={'md'}
                  key={attr}
                  variant='solid'
                  // colorScheme={'blue'}
                  bgColor={'primary.main'}
                >
                  <TagLabel>{attr}</TagLabel>
                </Tag>
              ))}
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
