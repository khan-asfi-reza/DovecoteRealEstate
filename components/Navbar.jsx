import Link from "next/link"
import {Flex, Spacer} from "@chakra-ui/layout";
import Image from "next/image";
import {Box, IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {BsSearch} from "react-icons/bs";
import {FcAbout, FcHome, FcMenu} from "react-icons/fc";
import {FiKey} from "react-icons/fi";
import Logo from "../assets/images/logo.png"

const NavMenuList = [
    {
        "name": "Home",
        "href": "/",
        "icon": <FcHome/>
    },
    {
        "name": "Search",
        "href": "/search",
        "icon": <BsSearch/>
    },
    {
        "name": "Buy",
        "href": "/search?purpose=for-sale",
        "icon": <FcAbout/>
    },
    {
        "name": "Rent",
        "href": "/search?purpose=for-rent",
        "icon": <FiKey/>
    },
]

const Navbar = () => (
    <>
        <Flex p={"2"} borderBottom={"1px"} alignItems={"center"} borderColor={"gray.100"}>
            <Box fontSize={"3xl"} color={"blue.700"} fontWeight={"bold"}>
                <Link href={"/"} paddingLeft={"2"}>
                    <Image height={50} width={45} src={Logo}/>
                </Link>
            </Box>
            <Spacer/>
            <Box>
                <Menu>
                    <MenuButton as={IconButton} icon={<FcMenu/>} variant={"outlined"} fontSize={"3xl"} color={"red.400"}/>
                    <MenuList>

                        {
                            NavMenuList.map(({name, href, icon}, key) => (
                                <Link key={key} href={href} passhref>
                                    <MenuItem icon={icon}>
                                        {name}
                                    </MenuItem>
                                </Link>
                            ))
                        }

                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    </>
)

export default Navbar