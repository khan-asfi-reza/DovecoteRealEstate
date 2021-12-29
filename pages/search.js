import {useState} from "react";
import {useRouter} from "next/router";
import {Flex, Box, Text, Icon} from "@chakra-ui/react"
import {BsFilter} from "react-icons/bs";
import Filters from "../components/Filters";
import Property from "../components/Property";
import {FaTimesCircle} from "react-icons/fa";
import {fetchAPI, URL} from "../utils/fetchAPI";

const Search = ({properties}) => {
    const [searchFilter, setSearchFilter] = useState(false);
    const router = useRouter()

    return(
        <Box>
            <Flex cursor={"pointer"}
                  bg={"gray.100"}
                  borderBottom={"1px"}
                  borderColor={"gray.200"}
                  p={"2"}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={()=>setSearchFilter(!searchFilter)}
            >

                <Text>
                    Search Property by Filter
                </Text>
                <Icon paddingLeft={"2"} w={"7"} as={BsFilter}/>
            </Flex>
            {searchFilter && <Filters/>}
            <Text fontSize={"2xl"} p={"4"} fontWeight={"bold"}>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap={"wrap"}>
                {
                    properties.map((property) => <Property property={property} key={property.id}/>)
                }
            </Flex>
            {
                properties.length === 0 && <Flex justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"3xl"}>No Results Found</Text> <Icon fontSize={"3xl"} as={FaTimesCircle} color={"red.400"} paddingLeft={"2"}/>
                </Flex>
            }
        </Box>
    )
}

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';

    const data = await fetchAPI(
        URL('properties/', 'list'),
        {
            locationExternalIDs: locationExternalIDs,
            categoryExternalID: categoryExternalID,
            areaMax: areaMax,
            sort: sort,
            bathsMin: bathsMin,
            roomsMin: roomsMin,
            maxPrice: maxPrice,
            minPrice: minPrice,
            rentFrequency: rentFrequency,
            purpose: purpose
        }
    );

    return {
        props: {
            properties: data?.hits,
        },
    };
}

export default Search;