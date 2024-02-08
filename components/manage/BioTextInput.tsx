import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Stack,
  Textarea,
  Text,
  useColorMode,
  useMediaQuery,
  useDisclosure,
} from '@chakra-ui/react';
import { bioAtom } from 'core/atoms';
import { useAtom } from 'jotai';

export default function BioTextInput() {
  const { colorMode } = useColorMode();
  const [bio, setBio] = useAtom(bioAtom);
  const [notMobile] = useMediaQuery('(min-width: 768px)');
  const { onToggle , isOpen} = useDisclosure();
  return (
    <Accordion
      allowToggle
      allowMultiple={false}
      className='bio'
      borderRadius={10}
      minWidth={'100%'}
      size="lg"
      backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
      display={'flex'}>
      <AccordionItem border={0} borderRadius={10} width={'100%'}>
        <AccordionButton minWidth={'100%'} as={Button} size="lg" _expanded={{bgColor: 'blackAlpha.50'}}>
          <Flex gap={2} alignItems={'center'} textAlign="left" width={notMobile ? '100%' : '100%'}>
            <Text fontWeight={'bold'} display={'flex'} flex={1}>
              Bio
            </Text>
            <AccordionIcon />
          </Flex>
        </AccordionButton>

        <AccordionPanel py={4} minWidth="100%">
          <Stack gap={2}>
            <Textarea
              minWidth="xs"
              rows={3}
              maxLength={150}
              placeholder={"I'm Sam. Blockchain Developer ..."}
              size="lg"
              bg={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
              variant="outline"
              border="none"
              resize={'none'}
              value={bio}
              onChange={(e) => setBio(e.currentTarget.value)}
            />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
