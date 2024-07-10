export const ECOSYSTEM_CATEGORIES = ['NFT Marketplace','NFT Launchpad','DEFI','Gaming','Collection','Utility','Bridge','Wallet'];

export const ECOSYSTEM_APPS = [
    {
        title: 'STAX CASINO',
        categories: [
            'Collection', 'Gaming', 'Casino'
        ],
        description:'The Premier Casino & Gaming Platform with 90% revenue share ',
        domain: 'stax.venom',
        link: 'https://venom.stax.live/',
        image: 'https://ipfs.io/ipfs/QmNUSpDPLqxjhVYXXW49R5KLAsyE4FRfqGr1aPuoFUsJbL/stax-logo.png',
        integrated: true
    },
    
    {
        title: 'RRRaffle',
        categories: [
            'Collection', 'Utility'
        ],
        description:'2222 Image Wallpapers usable on the Venom ID Platform',
        domain: 'rrrafle.venom',
        image: 'https://ipfs.io/ipfs/Qmb1Qr55YGtC1FEuMuKHhGjthX7Sht3ihmB8nQDFervKDC/rrraffle-collection.jpg',
        link: 'https://venomid.network/rrraffle',
        integrated: true
    },
    {
        title: 'Venom ID Tools',
        categories: [
            'Utility'
        ],
        description:'Transfer Tokens and NFTs to any .venom domain or wallet address',
        domain: 'tools.venom',
        image: 'https://ipfs.io/ipfs/QmZ1Nyq8Gywh4N9uKmGrBoEL4rC7UmDwPxE87fLAU2Rn6D/vidicon.jpg',
        link: 'https://venomid.tools/',
        integrated: true
    },
    {
        title: 'VENOM ART',
        categories: [
            'NFT Marketplace', 'NFT Launchpad'
        ],
        description:'The Premier NFT Marketplace and Launchpad for the Venom blockchain',
        domain: 'art.venom',
        link: 'https://venomart.io',
        image: 'https://ipfs.io/ipfs/QmXd1mZJerqR8SbgwLpBkFeMPwRx2DWP67EGX4TYXHg1Dx/S5ZuI6i9_400x400.jpg',
        integrated: false
    },
    {
        title: 'Ventory',
        categories: [
            'NFT Marketplace', 'NFT Launchpad'
        ],
        description:'Find the best upcoming and live NFT drops on the Venom blockchain',
        domain: '',
        link: 'https://venom.ventory.gg/',
        image: 'https://ipfs.io/ipfs/QmQArSqXxPFQa6Q6b5HHzFTa1t61eGUxswzde2XgtRcuEM/ventory.jpg',
        integrated: false
    },
    {
        title: 'Venom Wallet',
        categories: [
            'Wallet', 'Utility'
        ],
        description:'Non-custodial wallet with a Multisig accounts option and Ledger support',
        domain: '',
        image: 'https://ipfs.io/ipfs/QmX75ft4oh7fmJm2Ep1i9xeoiBvjzs6jpux4b7pWe24yhB/venomwallet.webp',
        link: 'https://venomwallet.com/',
        integrated: false
    },
    {
        title: 'Segmint',
        categories: [
            'Collection', 'Gaming'
        ],
        description:'Pixels game - take your place in blockchain history!',
        domain: '',
        link: 'https://segmint.app/',
        image: 'https://ipfs.io/ipfs/QmPxbvWGQtXwkYeC2KDanTBUgYEHnmV3sAosUiuoGwXMeB/segmint.jpg',
        integrated: false
    },
    {
        title: 'Dragons Land',
        categories: [
            'Collection', 'Gaming'
        ],
        description:'The trading card game where each card is a unique NFT, giving you true ownership!',
        domain: '',
        link: 'https://www.dragonz.land/',
        image: 'https://ipfs.io/ipfs/QmS8sMoD7sTmko167wGUmiBsfJKR7Xkh1duc8ACikn962V/dragonsland.jpg',
        integrated: false
    },
    {
        title: 'Venom Scan',
        categories: [
             'Utility'
        ],
        description:'Search and explore the immutable records of the Venom blockchain',
        domain: '',
        image: 'https://ipfs.io/ipfs/QmUXQ6CsWYLRVnTRY3CvCdJLoR3syHuPYNHiqDbw8RnS7u/venomscan-svg%20(1).jpg',
        link: 'https://venomscan.com/',
        integrated: false
    },
    {
        title: 'Venom Stake',
        categories: [
             'DEFI','Utility'
        ],
        description:'Secure solution for staking VENOM tokens, enabling users to maximize rewards',
        domain: '',
        image: 'https://ipfs.io/ipfs/QmfYLc1Y7EHWq726vNYmL7E1Vvi4jE1VTBzKRxoCKNBgHi/venomstake.jpg',
        link: 'https://venomstake.com/',
        integrated: false
    },
    {
        title: 'Venom Bridge',
        categories: [
             'Bridge'
        ],
        description:'Explore the world of interchain transactions',
        domain: '',
        image: 'https://ipfs.io/ipfs/QmPwfS3xKwu3WcFry69rWup4HRyBcLizcuptCDzA15CNkn/venombridge.jpg',
        link: 'https://venombridge.com/bridge',
        integrated: false
    },
    {
        title: 'Web3.World',
        categories: [
             'DEFI','Utility'
        ],
        description:'Intuitively swap assets, provide liquidity and farm available assets',
        domain: '',
        image: 'https://ipfs.io/ipfs/QmWzhqVomJHVTj1FA1TAdP6VQp49G79yK5dxJHffVxee4Q/web3world.jpg',
        link: 'https://web3.world/',
        integrated: false
    },
    
    {
        title: 'Oasis Gallery',
        categories: [
            'NFT Marketplace'
        ],
        description:'Trade unique digital assets on Venom blockchains NFT marketplace',
        domain: '',
        link: 'https://oasis.gallery/',
        image: 'https://ipfs.io/ipfs/QmdXJxW8JgDBCixQYbddgx7f1mto1zJGt6RqQYvjZyhx7r/oasis.JPG',
        integrated: false
    },
    
]

export interface EcosystemAppType {
    title: string;
    categories: string[];
    description:string;
    domain: string;
    image: string;
    link: string;
    integrated: boolean;
}