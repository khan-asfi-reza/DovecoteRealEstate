import '../styles/globals.css'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import Layout from "../components/Layout";
import Fonts from "../components/Fonts";
import "nprogress/nprogress.css";
import dynamic from 'next/dynamic';
const ProgressBar = dynamic(() => import('../components/Progress'), { ssr: false });

const theme = extendTheme({
    fonts: {
        heading: "Lato",
        body: "Lato",
    },
})

function MyApp({ Component, pageProps }) {
  return (
      <>
        <ProgressBar />
        <ChakraProvider theme={theme}>
          <Fonts/>
          <Layout>
              <Component {...pageProps} />
          </Layout>

        </ChakraProvider>
      </>
  )
}

export default MyApp
