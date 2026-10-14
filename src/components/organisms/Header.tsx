import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex, Spacer,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Desktop, Mobile } from "../../utils/hooks";
import { Language, getLocalizedPath, useLocalizedUrls } from "../../utils/language";

export const routeWithParameters = (url: string): string => {
  const searchParams = window.location.search;
  if (searchParams !== "") {
    return `${url}${searchParams}`;
  } else {
    return url;
  }
};

export function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const urls = useLocalizedUrls();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLanguageChange = (lang: string) => {
    const translatedPath = getLocalizedPath(location.pathname, lang);
    Language.setLanguage(lang);
    navigate(routeWithParameters(translatedPath));
  };

  return (
      <>
        {/* Desktop Menu */}
        <Desktop>
          <Box bg="white" pos="fixed" top="0" w="100%" zIndex={10} boxShadow="0 2px 12px rgba(27, 27, 27, 0.06)">
            <Flex
              display="grid"
              gridTemplateColumns="5fr 2fr 2fr 1fr 2fr 3fr 1fr"
              alignItems="center"
              maxW="1200px"
              p="4"
              m="0 auto"
              paddingLeft={"10em"}>
              <Box p='4' justifyContent="center" padding={"30px"}>
                <Text textAlign="center" fontSize={"25px"} lineHeight={"2"} fontWeight="600" bg={"#FAF7F0"} borderRadius={"15px"} padding={"5px"}>
                  <Link to={routeWithParameters(urls.Homepage)}> Gizem Çebi</Link>
                </Text>
              </Box>
              <Spacer />

              <Box
                  p='4'
                  cursor="pointer"
                  color="black"
                  _hover={{
                    color: "grey",
                  }}
                  justifyContent="center"
                  fontWeight="600"
              >
                <Text fontSize={"25px"} lineHeight={"2"}>
                  <Link to={routeWithParameters(urls.Projects)}>
                    {t("Menu.Projects")}
                  </Link>
                </Text>
              </Box>

              <Box
                  p='4'
                  cursor="pointer"
                  color="black"
                  _hover={{
                      color: "grey",
                  }}
                  justifyContent="center"
                  fontWeight="600"
              >
                <Text fontSize={"25px"} lineHeight={"2"}>
                    <Link to={routeWithParameters(urls.Contact)}>
                      {t("Menu.Contact")}
                    </Link>
                </Text>
              </Box>

              <Flex>
                {
                  ['tr', 'en'].map((item, index) => {
                    return (
                        <Text
                            key={index.toString()}
                            cursor="pointer"
                            marginRight="5px"
                            marginLeft="5px"
                            color="black"
                            fontWeight={i18n.language === item ? "900" : "600"}
                            onClick={() => handleLanguageChange(item)}
                        >
                          {item.toUpperCase()}
                        </Text>
                    );
                  })}
              </Flex>
            </Flex>
          </Box>
        </Desktop>

        {/* Mobile Menu */}
        <Mobile>
          <Box bg="white" pos="fixed" top="0" w="100%" zIndex={10} boxShadow="0 2px 12px rgba(27, 27, 27, 0.06)">
            <Flex alignItems="center" justifyContent="space-between" px="5" py="4">
              <Text fontWeight="700" fontSize="lg">
                <Link to={routeWithParameters(urls.Homepage)}>Gizem Çebi</Link>
              </Text>

              <Box
                  as="button"
                  aria-label="Menüyü aç"
                  onClick={onOpen}
                  w="28px"
                  h="20px"
              >
                <VStack spacing="2" align="stretch" h="100%" justify="center">
                  <Box h="2px" bg="black" borderRadius="full" />
                  <Box h="2px" bg="black" borderRadius="full" />
                  <Box h="2px" bg="black" borderRadius="full" />
                </VStack>
              </Box>
            </Flex>
          </Box>

          <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="white">
              <DrawerCloseButton />
              <DrawerBody pt="16">
                <VStack spacing="6" align="stretch" fontSize="xl" fontWeight="600">
                  <Link to={routeWithParameters(urls.Projects)} onClick={onClose}>
                    {t("Menu.Projects")}
                  </Link>
                  <Link to={routeWithParameters(urls.Contact)} onClick={onClose}>
                    {t("Menu.Contact")}
                  </Link>

                  <Flex gap="4" pt="4" borderTop="1px solid" borderColor="blackAlpha.100">
                    {['tr', 'en'].map((item) => (
                        <Text
                            key={item}
                            cursor="pointer"
                            fontWeight={i18n.language === item ? "900" : "600"}
                            onClick={() => {
                              handleLanguageChange(item);
                              onClose();
                            }}
                        >
                          {item.toUpperCase()}
                        </Text>
                    ))}
                  </Flex>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Mobile>
      </>
  );
}
