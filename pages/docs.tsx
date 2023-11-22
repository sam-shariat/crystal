import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import {
  Container,
  Flex,
  Box,
  useColorMode,
  Stack,
  Text,
  useColorModeValue,
  Heading,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { SITE_PROFILE_URL, SITE_URL } from 'core/utils/constants';
import { Seo } from 'components/Layout/Seo';
import Highlight from 'react-highlight';

// @ts-ignore: Unreachable code error
const SwaggerUI = dynamic<{ spec: any }>(import('swagger-ui-react'), { ssr: false });

function Docs({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { colorMode } = useColorMode();

  return (
    <Box bgColor={useColorModeValue('whiteAlpha.100', 'var(--dark0)')}>
      <Seo title="Venom ID API Docs" description="Anyone, Anywhere can access Venom IDs Data" />
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="75vh"
        pb={12}>
        <Stack>
          <Stack my={12} gap={20} px={2}>
            <Heading fontWeight="bold" fontSize="4xl">
              Venom ID API Docs (Beta)
            </Heading>
            <Stack>
              <Text fontSize="4xl" fontWeight={'bold'}>
                Overview
              </Text>
              <Text>
                Venom ID (VID) is a system that connects easy-to-understand names like 'sam.vid'
                with technical identifiers like Venom addresses, cryptocurrency addresses, avatars,
                and data information. VID also has a feature called 'reverse resolution' which
                allows you to link names with Venom addresses.
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="4xl" fontWeight={'bold'}>
                Enabling Venom ID in your DApp
              </Text>
              <Text>
                Integrating Venom ID (VID) into your application involves several crucial features
                that can be implemented independently. While a comprehensive VID integration is
                ideal, even basic support can greatly benefit users. Below, we present three levels
                of VID integration. Level 1 is easily achievable and provides significant impact for
                users, while levels 2 and 3 offer additional functionality, enhancing your dApp's
                usability and improving users' experience when interacting with it.
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="4xl" fontWeight={'bold'}>
                Resolving Venom ID names
              </Text>
              <Text>
                The initial step in supporting Venom ID in your application is enabling your
                application to understand VID names and accept them wherever an address is required.{' '}
              </Text>
              <Text>Currently, the simplest way to do this is through our rest APIs</Text>
              <Box rounded={'lg'} py={4} gap={2}>
                Example In Javascript :
                <Highlight language="javascript">
                  {`
import axios from 'axios';

const resolveAddress = async (name:string) => {
  return axios({
    method: 'get',
    url: 'https://venomid.network/api/name/ownerAddress',
    data: {
      name: name;
    }
  });
};

await resolveAddress('sam').then((res)=> {
  console.log(res.data);
}))

// Output => 0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765

`}
                </Highlight>
              </Box>
              <Text>
                By accepting VID names in your application, you eliminate the need for users to
                manually copy, paste, or type out lengthy and obscure Venom addresses. This reduces
                errors and the risk of losing funds.
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="4xl" fontWeight={'bold'}>
                Reverse Resolution
              </Text>
              <Text>
                The second level of VID integration involves displaying VID names wherever your app
                currently displays addresses.
              </Text>
              <Text>
                If a user enters a VID in your DApp, retain this name and display it whenever you
                would typically show the address.
              </Text>
              <Text>
                If a user enters an address or the address is obtained from another source, you are
                able to display an associated VID name by using the following request. 
                <Box rounded={'lg'} py={4} gap={2}>
                Example In Javascript :
                <Highlight language="javascript">
                  {`
import axios from 'axios';

const resolveName = async (address:string) => {
  return axios({
    method: 'get',
    url: 'https://venomid.network/api/owner/name',
    data: {
      ownerAddress: address;
    }
  });
};

await resolveName('0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765').then((res)=> {
  console.log(res.data);
}))

// Output => sam

`}
                </Highlight>
              </Box>
              </Text>
              <Text>
                This allows you to find the canonical name for an address and display it when
                available. If no canonical name is provided, your application can fallback to
                displaying the address as it did before.
              </Text>
              <Text>
                By supporting reverse resolution, you make it easier for your users to identify the
                accounts they interact with by associating them with a concise and readable name
                instead of a long, cryptic Venom address.
              </Text>

              <Text>
              Full SDK and API Documentation Coming Soon
              </Text>
            </Stack>
            <Stack>
              <Text fontSize="4xl" fontWeight={'bold'}>
                API Endpoints
              </Text>
              <Text fontWeight={'bold'}>https://venomid.network/api/</Text>
              <Text fontWeight={'bold'}>https://venomid.tools/api/</Text>
              <Text fontWeight={'bold'}>https://venomid.link/api/</Text>
            </Stack>
          </Stack>
          <Flex width={'100%'}>
            <SwaggerUI spec={spec} />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

const exampleOutput = {
  nftData: {
    nftAddress: '0:8e382a1c11a36fe4ffb7150b1674da4842f4f3805b18d5d4bc0d9dca0e5e34be',
    name: 'sam',
    owner: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
  },
  nftJson: {
    type: 'Basic NFT',
    name: 'sam.VID',
    description: 'sam.VID, a Venom ID',
    preview: {
      source: 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd',
      mimetype: 'image/svg',
    },
    files: [
      {
        source: 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd',
        mimetype: 'image/svg',
      },
    ],
    external_url: 'https://venomid.link/sam',
    attributes: [
      {
        trait_type: 'DATA',
        value: 'QmTmaX1kJJt5i1pCD77HzHaL8t4WWjzDL7YfVuR9C9aNb7/0',
      },
      {
        trait_type: 'LENGTH',
        value: 3,
      },
    ],
  },
  nftDetails: {
    name: 'sam.VID',
    venomAddress: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
    btcAddress: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
    ethAddress: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
    bio: 'Human Being and Blockchain Developer. Farming in my free time.',
    avatar: 'https://ipfs.io/ipfs/QmZik1JZ4meqdU6jvKwKU5qBS8AKic5cCvLH6Q9uQ9Qh93/sam-profile.jpg',
    links: [
      {
        type: 'simple text',
        title: 'Latest Project',
        url: '',
        image: '',
        content: '',
      },
      {
        type: 'image link',
        title: 'VenomID',
        url: 'https://venomid.network',
        image:
          'https://ipfs.io/ipfs/Qmd51HXWajWbiPFk5wdmuPkrHNJYyAf86uxM4jky2FWbKq/venombutton.jpg',
        content: '',
      },
    ],
    socials: {
      github: 'github.com/sam-shariat',
      twitter: 'https://twitter.com/SamyWalters',
      instagram: 'https://instagram.com/samshariat',
      linkedin: 'https://www.linkedin.com/in/sam-shariat-2981623b/',
      email: 'moslem.shariat@gmail.com',
    },
    lineIcons: false,
    lightMode: false,
  },
};

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Venom ID Rest API Docs (Beta)',
        version: '0.0.1',
        description:
          'At the moment, the integration of VID can only be done using the REST API. We are continuously working on updates and will soon release a stable version for seamless integration.',
      },
      tags: [
        {
          name: 'Venom ID Name',
          description: 'Get json information for the required venom id using the venom id name',
        },
        {
          name: 'Venom ID Avatar',
          description: 'Get image avatar of venom id using the venom id name',
        },
      ],
      paths: {
        '/api/name': {
          summary: 'Get venom id json info and details by name',
          get: {
            summary: 'Get venom id json info and details by name',
            tags: ['Venom ID Name'],
            description:
              'Use this endpoint to get the json information for the desired venom id using the venom id name',
            parameters: [
              {
                in: 'query',
                name: 'name',
                description: 'name of the venom id ( example : sam )',
                required: true,
                schema: {
                  type: 'string',
                  example: 'sam',
                },
              },
              {
                in: 'query',
                name: 'withDetails',
                description:
                  'if sent, nftDetails of venom id will returned in addition to other data',
                required: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'json response when venom id exists',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        nftData: { $ref: '#/components/schemas/nftData' },
                        nftJson: { $ref: '#/components/schemas/nftJson' },
                        nftDetails: { $ref: '#/components/schemas/nftDetails' },
                      },
                      example: exampleOutput,
                    },
                  },
                },
              },
              '202': {
                description: 'json response when venom id does not exists',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: 'error' },
                        message: { type: 'string', example: 'name does not exist' },
                      },
                      example: {
                        status: 'error',
                        message: 'name does not exist',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/api/name/ownerAddress': {
          summary: 'Get venom address of the required name',
          get: {
            summary: 'Get venom address of the required name',
            tags: ['Venom ID Name'],
            description: 'Use this endpoint to get the venom address of the venom id name owner',
            parameters: [
              {
                in: 'query',
                name: 'name',
                description: 'name of the venom id ( example : sam )',
                required: true,
                schema: {
                  type: 'string',
                  example: 'sam',
                },
              },
            ],
            responses: {
              '200': {
                description: 'string response when venom id exists',
                content: {
                  'text/plain': {
                    schema: {
                      type: 'string',
                      example: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
                    },
                  },
                },
              },
              '202': {
                description: 'json response when venom id doesn not exist',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: 'error' },
                        message: { type: 'string', example: 'name does not exist' },
                      },
                      example: {
                        status: 'error',
                        message: 'name does not exist',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/api/owner': {
          summary: 'Get venom id json info and details by owner',
          get: {
            summary: 'Get the primary venom id json info and details owned by ownerAddress',
            tags: ['Venom ID Name'],
            description:
              'Use this endpoint to get the json information of the primary venom id of the desired venom wallet address using the venom wallet address',
            parameters: [
              {
                in: 'query',
                name: 'ownerAddress',
                description: 'venom wallet address of the owner of the venom id',
                required: true,
                schema: {
                  type: 'string',
                  example: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
                },
              },
              {
                in: 'query',
                name: 'withDetails',
                description:
                  'if sent, nftDetails of venom id will returned in addition to other data',
                required: false,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '200': {
                description: 'json response when wallet owns a venom id',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        nftData: { $ref: '#/components/schemas/nftData' },
                        nftJson: { $ref: '#/components/schemas/nftJson' },
                      },
                      example: exampleOutput,
                    },
                  },
                },
              },
              '202': {
                description: 'json response when owner does not own a venom id',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: 'error' },
                        message: { type: 'string', example: 'owner does not own a venom id' },
                      },
                      example: {
                        status: 'error',
                        message: 'owner does not own a venom id',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/api/owner/name': {
          summary: 'Get venom id name by owner',
          get: {
            summary: 'Get the primary name owned by ownerAddress',
            tags: ['Venom ID Name'],
            description:
              'Use this endpoint to get the name string of the primary venom id of the desired venom wallet address using the venom wallet address',
            parameters: [
              {
                in: 'query',
                name: 'ownerAddress',
                description: 'venom wallet address of the owner of the venom id',
                required: true,
                schema: {
                  type: 'string',
                  example: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
                },
              },
            ],
            responses: {
              '200': {
                description: 'response when wallet owns a venom id',
                content: {
                  'plain/text': {
                    schema: {
                      type: 'string',
                      example: 'sam',
                    },
                  },
                },
              },
              '202': {
                description: 'json response when owner does not own a venom id',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: 'error' },
                        message: { type: 'string', example: 'owner does not own a venom id' },
                      },
                      example: {
                        status: 'error',
                        message: 'owner does not own a venom id',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '/api/avatar': {
          summary: 'Get venom id image avatar by name',
          get: {
            summary: 'Get venom id image avatar by name',
            tags: ['Venom ID Avatar'],
            description:
              'Use this endpoint to directly get the image avatar file for the desired venom id using the venom id name',
            parameters: [
              {
                in: 'query',
                name: 'name',
                description: 'name of the venom id ( example : sam )',
                required: true,
                schema: {
                  type: 'string',
                  example: 'sam',
                },
              },
            ],
            responses: {
              '200': {
                description: 'image/jpg avatar of venom id',
              },
            },
          },
        },
      },

      components: {
        schemas: {
          nftData: {
            type: 'object',
            properties: {
              nftAddress: {
                type: 'string',
                example: '0:8e382a1c11a36fe4ffb7150b1674da4842f4f3805b18d5d4bc0d9dca0e5e34be',
              },
              name: {
                type: 'string',
                example: 'sam',
              },
              owner: {
                type: 'string',
                example: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
              },
            },
          },
          nftJson: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                example: 'Basic Nft',
              },
              name: {
                type: 'string',
                example: 'sam.VID',
              },
              description: {
                type: 'string',
                example: 'sam.VID, a Venom ID',
              },
              preview: {
                type: 'object',
                properties: {
                  source: {
                    type: 'string',
                    example: 'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd',
                  },
                  mimetype: {
                    type: 'string',
                    example: 'image/svg',
                  },
                },
              },
              files: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    source: {
                      type: 'string',
                      example:
                        'https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd',
                    },
                    mimetype: {
                      type: 'string',
                      example: 'image/svg',
                    },
                  },
                },
              },
              external_url: {
                type: 'string',
                example: 'https://venomid.link/sam',
              },
              attributes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    trait_type: {
                      type: 'string',
                      example: 'DATA | LENGTH',
                    },
                    value: {
                      type: 'string | number',
                      example: 'QmTmaX1kJJt5i1pCD77HzHaL8t4WWjzDL7YfVuR9C9aNb7 | 7',
                    },
                  },
                },
                example: [
                  {
                    trait_type: 'DATA',
                    value: 'QmTmaX1kJJt5i1pCD77HzHaL8t4WWjzDL7YfVuR9C9aNb7/0',
                  },
                  {
                    trait_type: 'LENGTH',
                    value: 3,
                  },
                ],
              },
            },
          },
          nftDetails: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'sam.VID',
              },
              venomAddress: {
                type: 'string',
                example: '0:4bc69a8c3889adee39f6f1e3b2353c86f960c9b835e93397a2015a62a4823765',
              },
              btcAddress: {
                type: 'string',
                example: 'tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7',
              },
              ethAddress: {
                type: 'string',
                example: '0xBFd210db795A9Ac48D0C3be2a74232BE44144E84',
              },
              bio: {
                type: 'string',
                example: 'Human Being and Blockchain Developer. Farming in my free time.',
              },
              avatar: {
                type: 'string',
                example:
                  'https://ipfs.io/ipfs/QmZik1JZ4meqdU6jvKwKU5qBS8AKic5cCvLH6Q9uQ9Qh93/sam-profile.jpg',
              },
              links: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example:
                        'simple link | link image | simple text | youtube video | ipfs image',
                    },
                    title: {
                      type: 'string',
                      example: 'Title',
                    },
                    url: {
                      type: 'string',
                      example: 'url address of link',
                    },
                    image: {
                      type: 'string',
                      example: 'url address of image',
                    },
                    content: {
                      type: 'string',
                      example: 'simple text content',
                    },
                  },
                },
              },
              socials: {
                type: 'object',
                properties: {
                  twitter: {
                    type: 'string',
                    example: 'https://twitter.com/SamyWalters',
                  },
                  github: {
                    type: 'string',
                    example: 'https://github.com/sam-shariat',
                  },
                  instagram: {
                    type: 'string',
                    example: 'https://instagram.com/samshariat',
                  },
                },
              },
              lineIcons: {
                type: 'boolean',
                example: 'true | false',
              },
              lightMode: {
                type: 'boolean',
                example: 'true | false',
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default Docs;
