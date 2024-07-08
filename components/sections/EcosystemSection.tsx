import {
    useMediaQuery,
    Button,
    Container,
    Heading,
    Text,
    Stack,
    Box,
    Center,
    SimpleGrid,
    HStack,
    Grid,
    GridItem,
    useColorMode,
    Flex,
    Link,
    Badge,
    Avatar,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,
} from '@chakra-ui/react';
import { useTranslate } from 'core/lib/hooks/use-translate';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    AVATAR_API_URL,
    BG_COLORS,
    OASIS_COLLECTION,
    RAFFLE_CONTRACT_ADDRESS,
    SITE_PROFILE_URL
} from 'core/utils/constants';
import {
    motion,
} from 'framer-motion';
import { LinkIcon, Logo, LogoIcon } from 'components/logos';
import { ECOSYSTEM_APPS, ECOSYSTEM_CATEGORIES, EcosystemAppType } from 'core/utils/ecosystem';
import { useEffect, useState } from 'react';
import ImageBox from 'components/claiming/ImageBox';
import DomainTag from 'components/features/DomainTag';

export default function EcosystemSection() {
    const { t } = useTranslate();
    const [notMobile] = useMediaQuery('(min-width: 769px)');
    const { colorMode } = useColorMode();
    const lightMode = colorMode === 'light';
    const [cat, setCat] = useState('All');
    const [apps, setApps] = useState<EcosystemAppType[] | undefined>(undefined);

    useEffect(() => {
        if (cat === 'All') {
            setApps(undefined);
        } else {
            setApps(()=> ECOSYSTEM_APPS.filter((item) => item.categories.includes(cat)));
            console.log(cat)
            console.log(ECOSYSTEM_APPS.filter((item) => item.categories.includes(cat)))
        }

    }, [cat])

    return (
        <motion.div key={'ecosystem'}>
            <Container
                maxW="container.xl"
                display="grid"
                placeContent="center"
                placeItems="center"
                minH="90vh"
                py={16}
                pb={0}>

                <Stack px={[0, 4, 6]} gap={12} align={'center'}>
                    <Center flexDirection={'column'} p={[4, 6, 8, 16]} rounded={'2xl'} gap={16} w={'100%'}>

                        <Text fontSize={'4xl'} fontWeight={'bold'}>Ecosystem Dapps</Text>
                        <Box>
                            <Button m={1} onClick={() => setCat('All')} isActive={cat === 'All'} variant={'outline'}>All</Button>
                            {ECOSYSTEM_CATEGORIES.map((item) => <Button m={1} onClick={() => setCat(item)} key={'dapp-cat-'+item} isActive={cat === item} variant={'outline'}>{item}</Button>)}
                        </Box>
                        <SimpleGrid columns={[1, 1, 2, 2, 3]} gap={[10, 10, 10, 6]} placeItems={'center'} key={cat}>

                            {(apps ? apps : ECOSYSTEM_APPS).map((app) =>
                                <Card gap={0} w={'100%'} bgColor={lightMode ? 'white' : 'whiteAlpha.100'} rounded={'xl'} key={'dapp-card-'+app.title}>
                                    <CardHeader display={'flex'} justifyContent={'space-between'}>
                                        <Text fontSize={['2xl', '2xl', '2xl']} fontWeight={'bold'}>
                                            {app.title}
                                        </Text>
                                        {app.integrated && <Tooltip
                                            borderRadius={4}
                                            label={<Text p={2}>Supports Venom ID</Text>}
                                            hasArrow
                                            color="white"
                                            bgColor={'black'}><Button variant={'ghost'}><Logo /></Button></Tooltip>}</CardHeader>
                                    <CardBody py={0}>
                                        <Stack gap={4} w={'100%'} >
                                            <Flex gap={3} justify={'center'} align={'center'} py={2}>
                                            <ImageBox srcUrl={app.image} shadow='none' size={'100px'} rounded='xl' />

                                            <Text>{app.description}</Text>
                                            </Flex>
                                            <Center>
                                                {app.categories.map((appCat) => <Badge key={'dapp-badge-'+app.domain+'-'+appCat} p={2} m={1} rounded={'full'}>{appCat}</Badge>)}
                                            </Center>
                                        </Stack>
                                    </CardBody>
                                    <CardFooter>
                                        <Button w={'100%'} gap={2} style={{ textDecoration: 'none' }} colorScheme='venomAlpha' as={Link} target='_blank' href={app.link} size={'lg'} >View DApp <LinkIcon type='RiExternalLinkLine' size={'18px'} /></Button>
                                    </CardFooter>

                                </Card>)}

                        </SimpleGrid>
                    </Center>
                </Stack>
            </Container>
            <Container
                maxW="100%"
                px={0}
                display="grid"
                placeContent="center"
                placeItems="center"
                pb={16}>
                <SimpleGrid columns={[1]} gap={10} px={0} >
                    <GridItem>
                        <Stack px={0} gap={12} align={'center'} py={20}>


                        </Stack>
                    </GridItem>
                </SimpleGrid>
            </Container>
        </motion.div>
    );
}
