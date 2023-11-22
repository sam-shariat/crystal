import {
  Button,
  Tooltip,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  Flex,
  Link,
  useMediaQuery,
  useClipboard,
  IconButton,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { capFirstLetter, truncAddress } from 'core/utils';
import { SITE_MANAGE_URL, VENOMSCAN_NFT } from 'core/utils/constants';
import { VenomScanIcon } from 'components/logos';
import {
  RiCheckDoubleFill,
  RiFileCopyLine,
  RiSettings3Line,
  RiShieldCheckFill,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { Avatar } from 'components/Profile';

interface Props {
  message: any;
  claimedName: string;
}

export default function ClaimModal({ message, claimedName }: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslate();
  const { onCopy, hasCopied } = useClipboard(String(message.link));

  useEffect(() => {
    if (message.msg.length > 0 && message.type == 'success') {
      onOpen();
    }
  }, [message]);

  return (
    <>
      {message.type == 'success' && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'2xl'}>
          <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
          <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
            <ModalHeader textAlign={'center'}>{message.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody gap={2}>
              <Flex gap={2} justify={'center'}>
                <Text fontSize={'lg'}>{message.msg}</Text>
              </Flex>
              <Flex flexDir={'column'} justify={'center'} p={2} align={'center'}>
                <Box maxW={'xs'}>
                  <Text
                    position={'absolute'}
                    w={'xs'}
                    mt={6}
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    textAlign={'center'}>
                    {claimedName}.VID{' '}
                  </Text>
                  <Avatar my={1} noanimate nodrag url={''} alt={claimedName} radius={12} />
                </Box>
              </Flex>

              <Flex gap={2} flexDirection={'column'} justify={'center'} align={'center'}>
              <Flex gap={2} align={'center'} w={'xs'} justify={'space-between'}>
                  <Text fontSize={'lg'} fontWeight={'normal'}>
                    {' '}
                    Address : {truncAddress(message.link)}{' '}
                  </Text>
                  <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Copy NFT Address</Text>}
                    color="white"
                    bgColor={'black'}
                    hasArrow>
                    <IconButton onClick={onCopy} variant={'ghost'} aria-label={`copy-nft-address`}>
                      {hasCopied ? <RiCheckDoubleFill size={22} /> : <RiFileCopyLine size={22} />}
                    </IconButton>
                  </Tooltip>
                </Flex>
                <Link href={VENOMSCAN_NFT + message.link} target="_blank" id={`venom-id-nft-link`}>
                  <Button width={'xs'} variant={'solid'} height={'54px'} colorScheme="gray">
                    <Flex
                      gap={2}
                      width={'100%'}
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <Stack gap={1} p={1}>
                        <Text textAlign={'left'}>{t('view')}</Text>
                        <Text
                          display={'flex'}
                          fontSize={'sm'}
                          gap={1}
                          color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
                          venomscan.com
                        </Text>
                      </Stack>
                      <VenomScanIcon />
                    </Flex>
                  </Button>
                </Link>

                <Link
                  href={SITE_MANAGE_URL + 'manage/' + message.link}
                  target="_blank"
                  id={`venom-id-manage-nft-link`}>
                  <Button width={'xs'} height={'54px'} colorScheme="green" variant={'solid'}>
                    <Flex
                      gap={2}
                      width={'100%'}
                      alignItems={'center'}
                      justifyContent={'space-between'}>
                      <Stack gap={1} p={1}>
                        <Text textAlign={'left'}>{t('manage')}</Text>
                        <Text
                          display={'flex'}
                          fontSize={'sm'}
                          gap={1}
                          color={colorMode === 'dark' ? 'gray.800' : 'gray.200'}>
                          venomid.tools
                        </Text>
                      </Stack>
                      <RiSettings3Line size={'30px'} />
                    </Flex>
                  </Button>
                </Link>
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
