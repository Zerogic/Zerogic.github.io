import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import chakraTheme from "@chakra-ui/theme";

// This is the chain your dApp will work on.
const activeChain = "polygon";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
