import {
  Button,
  useColorMode,
  Text,
  useDisclosure,
  Flex,
  Link,
  Select,
  useColorModeValue,
  Stack,
  Input,
  useToast,
  Container,
  Box,
  Collapse,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  RiCheckboxCircleFill,
  RiQuestionFill,
  RiShakeHandsLine,
  RiUploadCloudLine,
} from 'react-icons/ri';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { useAtomValue } from 'jotai';
import { connectedAccountAtom, primaryNameAtom } from 'core/atoms';
import { useStorageUpload } from '@thirdweb-dev/react';
import { LinkIcon } from 'components/logos';
import { isValidEmail, truncAddress } from 'core/utils';
import { render } from '@react-email/render';
import ContributionsMail from 'components/mail/Contribution';
import sendEmail from 'core/utils/sendEmail';
import ShareButtons from 'components/Profile/ShareButtons';
import { SITE_URL } from 'core/utils/constants';
import WaitlistMail from 'components/mail/Waitlist';

export default function ContributionSection() {
  const { colorMode } = useColorMode();
  const [role, setRole] = useState('Graphic Designer');
  const [uploading, setUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [comment, setComment] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const primary = useAtomValue(primaryNameAtom);
  const { t } = useTranslate();
  const [file, setFile] = useState('');
  const { mutateAsync: upload } = useStorageUpload();
  const contributionEmailHtml = render(
    <ContributionsMail
      position={role}
      email={email}
      telegram={telegram}
      comment={comment}
      resume={file}
      wallet={connectedAccount}
    />
  );

  const waitlistEmailHtml = render(
    <WaitlistMail
      email={email}
      telegram={telegram}
      comment={comment}
      wallet={wallet}
      venomWallet={connectedAccount}
    />
  );

  async function send() {
    if (!isValidEmail(email)) {
      toast({
        title: 'Invalid Email',
        status: 'warning',
        description: 'Please enter a valid email address',
        isClosable: true,
        duration: 4000,
      });
      return;
    }
    setSending(true);
    await sendEmail(role === 'Investment NFT' ? 'Congrats! You have been added to the waitlist of the Investment NFT at Venom ID' : `Application Received for ${role} at Venom ID`, email, role === 'Investment NFT' ? waitlistEmailHtml : contributionEmailHtml)
      .then((res) => {
        if (res.status === 200) {
          setSent(true);
          toast({
            title: role === 'Investment NFT' ? 'Request Sent' : 'Application Sent',
            status: 'success',
            description: 'Thank you for your participation, We will get back to you soon',
            isClosable: true,
            duration: 4000,
          });
        } else {
          setSent(false);
          toast({
            title: 'Error Sending Application',
            status: 'error',
            description: 'Please change your network and try again',
            isClosable: true,
            duration: 4000,
          });
        }
      })
      .catch((e) => {
        setSent(false);
        toast({
          title: 'Error Sending Application',
          status: 'error',
          description: 'Please change your network and try again',
          isClosable: true,
          duration: 4000,
        });
      });
    setSending(false);
  }

  function buildFileSelector(mimetypes: string) {
    if (process.browser) {
      const fileSelector = document.createElement('input');
      fileSelector.type = 'file';
      fileSelector.multiple = false;
      fileSelector.onchange = async (e: any) => {
        sendproFileToIPFS(e.target.files[0]);
      };
      fileSelector.accept = mimetypes;
      return fileSelector;
    }
  }

  const pdfFileSelect = buildFileSelector('application/pdf');

  const sendproFileToIPFS = async (e: any) => {
    if (e) {
      try {
        const formData = [e];
        console.log('uploading file to ipfs');
        setUploading(true);
        const uris = await upload({ data: formData });
        //const ImgHash = resFile.data.IpfsHash;
        //console.log(ImgHash);
        setFile('https://ipfs.io/ipfs/' + uris[0].slice(7));
        setUploading(false);
      } catch (error) {
        alert('Error sending File to IPFS, Please check your network and Try Again');
        setUploading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <Box>
        <Container
          as="main"
          maxW="container.lg"
          display="grid"
          flexDir={'column'}
          justifyContent={'center'}
          alignContent={'center'}
          minH={'84vh'}
          flexGrow={1}>
          <Box py={6} gap={2} width={'100%'}>
            <Flex align={'center'} gap={2} justify={'space-between'} my={4}>
              <Text fontSize={'4xl'} fontWeight={'bold'}>
                {t('contributer')}
              </Text>
              <ShareButtons
                text={`🌐 Contribution Opportunity%0a%0a🚀Join Venom ID as a ${role} Contributor!%0a%0aBe part of the team shaping the future of identity management.%0a%0aJoin us now! @venomid_network%0a%0a`}
                hashtags={`${role.replaceAll(' ', '').replace('/', '')},role`}
                url={SITE_URL + 'contribute'}
              />
            </Flex>
            <Flex>
              <Box display={'flex'} flexDir={'column'} gap={4} w={'100%'} fontSize={'xl'} my={10}>
                <Text>There are several ways to become a major contributor in venom id</Text>
                <Flex gap={2} align={'center'}>
                  <Select
                    _focus={{ borderColor: useColorModeValue('var(--dark1)', 'var(--white)') }}
                    size={'lg'}
                    height={'60px'}
                    variant={'filled'}
                    colorScheme="green"
                    onChange={(e) => {
                      setRole(e.currentTarget.value);
                      setSent(false);
                    }}
                    value={role}>
                    <option value={'Graphic Designer'}>Graphic Designer</option>
                    <option value={'Investment NFT'}>Investment NFT</option>
                    <option value={'Partnership'}>Partnership</option>
                    <option value={'UI/UX Designer'}>UI/UX Designer</option>
                    <option value={'FrontEnd Developer'}>Front-End Developer</option>
                    <option value={'Solidity Developer'}>Solidity Developer</option>
                    <option value={'Content Creator'}>Content Creator</option>
                    <option value={'Community Manager'}>Community Manager</option>
                    <option value={'Marketing Manager'}>Marketing Manager</option>
                  </Select>
                </Flex>
                <Collapse startingHeight={80} in={isOpen}>
                  <Stack gap={2} my={4}>
                    <Text fontWeight={'bold'}>WHAT IS THE ROLE LIKE?</Text>

                    <Text>{t(role.replaceAll(' ', '').replace('/', ''))}</Text>
                  </Stack>
                  <Stack gap={2} mb={4}>
                    <Text fontWeight={'bold'}>IMPORTANT NOTE</Text>

                    <Text>{t('roleClarify')}</Text>
                    <Text>{t('roleClarify2')}</Text>
                  </Stack>
                  {role === 'FrontEnd Developer' && (
                    <Text fontWeight={'bold'}>{t('FrontEndDeveloperStack')}</Text>
                  )}
                </Collapse>
                <Button size="lg" onClick={isOpen ? onClose : onOpen}>
                  Show {isOpen ? 'Less' : 'More'}
                </Button>
                <Flex
                  rounded={'lg'}
                  flexDir={'column'}
                  gap={2}
                  p={4}
                  py={6}
                  bgColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>
                  <Text fontWeight={'bold'}>Email address</Text>
                  <Input
                    _focus={{ borderColor: useColorModeValue('var(--dark1)', 'var(--white)') }}
                    value={email}
                    size={'lg'}
                    placeholder="example@gmail.com"
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                      setSent(false);
                    }}
                  />

                  <Text fontWeight={'bold'} mt={4}>
                    Telegram username (optional)
                  </Text>
                  <Input
                    _focus={{ borderColor: useColorModeValue('var(--dark1)', 'var(--white)') }}
                    value={telegram}
                    size={'lg'}
                    placeholder="@exampleuser"
                    onChange={(e) => {
                      setTelegram(e.currentTarget.value);
                      setSent(false);
                    }}
                  />
                  {role !== 'Investment NFT' && (
                    <>
                      <Text fontWeight={'bold'} mt={4}>
                        Upload your resume pdf (optional)
                      </Text>
                      <Button
                        size="lg"
                        isDisabled={uploading}
                        isLoading={uploading}
                        gap={2}
                        onClick={() => pdfFileSelect !== undefined && pdfFileSelect.click()}>
                        {file ? <LinkIcon type="pdf doc" line /> : <RiUploadCloudLine size="24" />}{' '}
                        {file ? 'Uploaded' : 'Upload PDF'}
                      </Button>
                    </>
                  )}
                  {role === 'Investment NFT' && (
                    <>
                      <Text fontWeight={'bold'} mt={4}>
                        Ethereum Wallet Address (optional)
                      </Text>
                      <Input
                        _focus={{ borderColor: useColorModeValue('var(--dark1)', 'var(--white)') }}
                        value={wallet}
                        size={'lg'}
                        placeholder="0xBFd210db795A9Ac48D0C3be2a74232BE44144E84"
                        onChange={(e) => {
                          setWallet(e.currentTarget.value);
                          setSent(false);
                        }}
                      />
                    </>
                  )}
                  <Text fontWeight={'bold'} mt={4}>
                    Anything that you would like us to know (optional)
                  </Text>
                  <Input
                    _focus={{ borderColor: useColorModeValue('var(--dark1)', 'var(--white)') }}
                    value={comment}
                    size={'lg'}
                    placeholder="anything at all"
                    onChange={(e) => {
                      setComment(e.currentTarget.value);
                      setSent(false);
                    }}
                  />
                </Flex>
              </Box>
            </Flex>
            <Flex align={'center'} my={6}>
              {sent ? (
                <Text fontSize={'2xl'}>
                  Thank you for your application. we will get in touch with you soon
                </Text>
              ) : (
                <Button
                  flexDir={'column'}
                  w={'100%'}
                  height={'80px'}
                  size="lg"
                  isLoading={sending}
                  onClick={() => send()}
                  colorScheme="green"
                  isDisabled={uploading || sending}
                  gap={2}>
                  <Text fontSize={'xl'}>
                    {role === 'Investment NFT' ? 'Join Waitlist' : 'Apply for Role'}
                  </Text>
                  {connectedAccount && (
                    <Text fontSize={'sm'}>As Address {truncAddress(connectedAccount)}</Text>
                  )}
                </Button>
              )}
            </Flex>
          </Box>
        </Container>
      </Box>
    </>
  );
}
