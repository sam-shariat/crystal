export const ECOSYSTEM_CATEGORIES = ['NFT Marketplace','NFT Launchpad','DEFI','Art','Gaming','Collection','Utility','Bridge','Wallet'];

export const ECOSYSTEM_APPS = [
    {
        title: 'STAX CASINO',
        categories: [
            'Collection', 'Gaming', 'Casino'
        ],
        description:'The Premier Casino & Gaming Platform with 90% revenue share ',
        domain: 'stax.venom',
        link: 'https://venom.stax.live/',
        image: 'stax.venom',
        integrated: true
    },
    {
        title: 'RRRaffle',
        categories: [
            'Collection', 'Utility'
        ],
        description:'2222 Image Wallpapers usable on the Venom ID Platform',
        domain: 'rrrafle.venom',
        image: 'rrrafle.venom',
        link: 'https://venomid.network/rrraffle',
        integrated: true
    },
    {
        title: 'VENOM ART',
        categories: [
            'NFT Marketplace', 'NFT Launchpad'
        ],
        description:'The Premier NFT Marketplace and Launchpad',
        domain: 'art.venom',
        link: 'https://venomart.io',
        image: 'stax.venom',
        integrated: false
    },
    
]

export interface EcosystemAppType {
    title: string;
    categories: string[];
    description:string;
    domain: string;
    link: string;
    integrated: boolean;
}