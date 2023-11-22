import type { AppProps } from 'next/app';
import ThemeProvider from 'components/Provider/ThemeProvider';
import Layout from 'components/Layout';
import { useDirectionSetter } from 'core/lib/hooks/use-directionSetter';
import { VenomConfig } from 'venom-react-hooks';
import { initVenomConnect } from 'components/venomConnect/configure';
import { ThirdwebProvider, metamaskWallet, walletConnect, zerionWallet } from '@thirdweb-dev/react';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useDirectionSetter();

  return (
    <ThemeProvider>
      <VenomConfig initVenomConnect={initVenomConnect}>
        <ThirdwebProvider
          supportedWallets={[metamaskWallet(), walletConnect(), zerionWallet()]}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_ID}>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </ThirdwebProvider>
      </VenomConfig>
    </ThemeProvider>
  );
}

export default MyApp;
