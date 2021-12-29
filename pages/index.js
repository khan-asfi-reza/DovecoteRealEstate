import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {fetchAPI, URL} from "../utils/fetchAPI";
import {Box, Button, Flex, Text} from "@chakra-ui/react";
import Property from "../components/Property";
import ForSellImage from "../assets/images/forsell.jpg"
import ForRentImage from "../assets/images/forent.jpg"
import HomeBG from "../assets/images/homebg.jpg";
/**
 * Banner Component, used as a banner for other component
 * @param purpose {text} Purpose Of the banner, for which the banner will be used
 * @param imageUrl {text} Banner Image URL
 * @param title1
 * @param title2
 * @param description
 * @param link {text} Banner Click Redirect Link
 * @param buttonText
 */
const Banner = ({purpose, imageUrl, title1, title2, description, link, buttonText}) => (

    <Flex flexWrap={"wrap"} alignItems={"Center"} m={"10"}>
      <Image src={imageUrl} flex={"1"} width={700} height={400} alt={"Banner"}/>
      <Box p={"10"}>
        <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}> {purpose} </Text>
        <Text fontSize={"3xl"} fontWeight={"bold"}> {title1} <br/> {title2} </Text>
        <Text color={"gray.700"} paddingY={"3"} fontSize={"sm"} fontWeight={"medium"}> {description} </Text>
        <Button _hover={{bg: "blue.500"}} fontSize={"xl"} textColor={"gray.100"} bg={"blue.400"}>
          <Link href={link}>{buttonText}</Link>
        </Button>
      </Box>
    </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} bgSize={"cover"} height={"70vh"} bgRepeat={"no-repeat"} bgPosition={"center"} bgImg={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(${HomeBG.src})`}>
            <Text color={"white"} fontWeight={"black"} fontSize={"7xl"}>
                DoveCote
            </Text>
            <Text color={"gray.200"} fontSize={"xl"}>
                The best real estate application
            </Text>
      </Box>
      <Banner
          purpose='RENT A HOME'
          title1='Rental Homes for'
          title2='Everyone'
          description='Explore from Apartments, builder floors, villas and more'
          buttonText='Explore Renting'
          link='/search?purpose=for-rent'
          imageUrl={ForRentImage}
      />
        <Flex flexWrap={"wrap"}>
            {
                propertiesForRent.map((property, key) =>
                    <Property key={key} property={property}/>
                )
            }
        </Flex>
      <Banner
        purpose='BUY A HOME'
        title1='Buy your desired'
        title2='and beautiful house'
        description='Explore from Apartments, builder floors, villas and more'
        buttonText='Explore Buying'
        link='/search?purpose=for-sale'
        imageUrl={ForSellImage}
      />
        <Flex flexWrap={"wrap"}>
            {
                propertiesForSale.map((property, key) =>
                    <Property key={key} property={property}/>
                )
            }
        </Flex>
    </Box>
  )
}

export async function getStaticProps() {
    const propertiesForSale = await fetchAPI(
        URL('properties/', 'list',),
        {
            locationExternalIDs: 5002,
            purpose: "for-sale",
            hitsPerPage: 6
        }
    )
    const propertiesForRent = await fetchAPI(
        URL('properties/', 'list',),
        {
            locationExternalIDs: 5002,
            purpose: "for-rent",
            hitsPerPage: 6
        }
    )

    return {
        props: {
            propertiesForSale: propertiesForSale?.hits,
            propertiesForRent: propertiesForRent?.hits
        }
    }
}