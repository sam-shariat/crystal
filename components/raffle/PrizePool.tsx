import {
    Button,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import Prize from 'components/features/Prize';
import { LinkIcon, Logo } from 'components/logos';

export default function PrizePool() {
  const [notMobile] = useMediaQuery('(min-width: 769px)');
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Button onClick={onOpen} colorScheme='venom' size={'lg'} w={['100%','sm','md']} height={'64px'} gap={3} fontSize={'2xl'}> <LinkIcon type='RiGiftLine' /> Prize Pool <LinkIcon type='RiGiftLine' /></Button>
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="auto" backdropBlur={'6px'} />
      <ModalContent bg={colorMode === 'light' ? 'var(--white)' : 'var(--dark1)'}>
        <ModalHeader textAlign={'center'} display={'flex'} gap={2} justifyContent={'center'} fontSize={'4xl'}>
          🎁 Prize Pool 🎁 <ModalCloseButton />
        </ModalHeader>
        <ModalBody display={'flex'} justifyContent={'center'} alignContent={'center'} w={'100%'}>
          <SimpleGrid columns={[1]} gap={10}>
            <GridItem
              display={'flex'}
              justifyContent={'center'}>
              <Stack px={[0, 4, 6, 10]} py={12} textAlign={'center'} justify={'center'} align={'center'}>
                <SimpleGrid columns={[1, 1, 1]} gap={6} py={6}>
                  <Prize
                    name={'3-letter .venom domains'}
                    value="$2400"
                    icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                    number={30}
                  />
                  <Prize
                    name={'4-letter .venom domains'}
                    value="$2400"
                    icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                    number={60}
                  />
                  <Prize
                    name={'5-letter .venom domains'}
                    value="$400"
                    icon={<Logo w={notMobile ? '76px' : '38px'} h={notMobile ? '60px' : '30px'} />}
                    number={90}
                  />
                  <Prize
                    name={'40 $VENOM Tokens'}
                    value="$600"
                    icon={<LinkIcon type="venom" size={notMobile ? 76 : 38} />}
                    number={30}
                  />
                </SimpleGrid>
                <Text fontWeight="bold" fontSize={['xl', '3xl']} textAlign={['center']}>
                  🪙 Total Value: ~$6,000 🪙
                </Text>
              </Stack>
            </GridItem>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
}
