// import {
//   Button,
//   Box,
//   useColorMode,
//   Stack,
//   Text,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Tabs,
//   TabList,
//   Tab,
//   TabPanels,
//   TabPanel,
//   Select,
//   Link,
// } from '@chakra-ui/react';
// import React, { useCallback, useEffect, useState } from 'react';
// import { RiCheckLine, RiShuffleLine } from 'react-icons/ri';
// import { useAtom, useAtomValue } from 'jotai';
// import {
//   addressAtom,
//   btcAtom,
//   connectedAccountAtom,
//   ethAtom,
//   isConnectedAtom,
//   lightModeAtom,
//   networkAtom,
// } from 'core/atoms';
// import { capFirstLetter, truncAddress } from 'core/utils';
// import { ETH, LinkIcon, SocialIcon, VenomFoundation } from 'components/logos';
// import QRCode from 'react-qr-code';
// import { Address } from 'everscale-inpage-provider';
// import { useConnect, useSendMessage } from 'venom-react-hooks';
// import {
//   ConnectWallet,
//   useSDK,
//   useAddress,
//   useConnect as useThirdWebConnect,
//   metamaskWallet,
// } from '@thirdweb-dev/react';
// import { WalletAccount, Ylide } from '@ylide/sdk';
// import { YlideKeysRegistry } from '@ylide/sdk/lib/keystore/YlideKeysRegistry';
// import { tvm } from '@ylide/everscale';
// import { evm } from '@ylide/ethereum';

// const metamaskConfig = metamaskWallet();
// export default function Messages() {
//   const { colorMode } = useColorMode();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const lightMode = useAtomValue(lightModeAtom);
//   const keysRegistry = new YlideKeysRegistry();
//   const ylide = new Ylide(keysRegistry);
//   ylide.add(tvm);
//   ylide.add(evm);

//   const [isInited, setIsInited] = useState(false);
//   const [account, setAccount] = useState<WalletAccount | null>(null);

//   const isMetaMaskAvailable = ylide.controllers.wallets.some((w) => w.wallet() === 'metamask');
//   const isVenomWalletAvailable = ylide.controllers.wallets.some(
//     (w) => w.wallet() === 'venomwallet'
//   );

//   const connectWallet = useCallback(async (walletName: string) => {
//     const wallet = ylide.controllers.wallets.find((w) => w.wallet() === walletName)!;

//     const newAccount = await wallet.requestAuthentication();
//     if (!newAccount) {
//       return;
//     }

//     setAccount(newAccount);
//   }, []);

//   const disconnect = useCallback(async () => {
//     if (!account) {
//       return;
//     }
//     const wallet = ylide.controllers.wallets.find(
//       (w) => w.wallet() === account.wallet && w.blockchainGroup() === account.blockchainGroup
//     );
//     if (wallet) {
//       await wallet.disconnectAccount(account);
//     }
//     setAccount(null);
//   }, [account]);

//   useEffect(() => {
//     ylide
//       .init()
//       .then(() => setIsInited(true))
//       .catch((err) => alert(`Initialization error: ${err.message}`));
//   }, []);

//   return (
//     <>
//       <Button
//         bgColor={lightMode ? 'blackAlpha.200' : 'whiteAlpha.200'}
//         color={lightMode ? 'var(--dark1)' : 'var(--white)'}
//         variant={'outline'}
//         gap={2}
//         onClick={onOpen}
//         flexGrow={0.5}>
//         <LinkIcon type="donate" line color={lightMode ? 'var(--dark1)' : 'var(--white)'} /> Inbox
//       </Button>
//       <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
//         <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur={'6px'} />
//         <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
//           <ModalHeader>Inbox of</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {account ? (
//               <div>
//                 {account.address} <Button onClick={disconnect} title="Disconnect" />
//                 <br />
//               </div>
//             ) : (
//               <>
//                 <Button
//                   isDisabled={!isMetaMaskAvailable}
//                   onClick={() => connectWallet('metamask')}
//                   title="Login via MetaMask"
//                 />
//                 &nbsp;&nbsp;&nbsp;
//                 <Button
//                   isDisabled={!isVenomWalletAvailable}
//                   onClick={() => connectWallet('venomwallet')}
//                   title="Login via VenomWallet"
//                 />
//               </>
//             )}
//           </ModalBody>
//           <ModalFooter />
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
