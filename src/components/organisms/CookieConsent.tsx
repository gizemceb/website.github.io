import {useEffect, useState} from "react";
import {Button, Flex, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {Analytics} from "../../utils/analytics";

export function CookieConsent() {
    const {t} = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = Analytics.getConsent();
        if (consent === null) {
            setVisible(true);
        } else {
            Analytics.initIfConsented();
        }
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <Flex
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            zIndex={20}
            bg="white"
            boxShadow="0 -4px 20px rgba(27, 27, 27, 0.12)"
            p={{base: 4, lg: 6}}
            direction={{base: "column", lg: "row"}}
            alignItems="center"
            justifyContent="center"
            gap={4}
        >
            <Text fontSize="sm" textAlign={{base: "center", lg: "left"}}>
                {t("Cookies.Message")}
            </Text>
            <Flex gap={3}>
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                        Analytics.denyConsent();
                        setVisible(false);
                    }}
                >
                    {t("Cookies.Reject")}
                </Button>
                <Button
                    size="sm"
                    colorScheme="purple"
                    onClick={() => {
                        Analytics.grantConsent();
                        setVisible(false);
                    }}
                >
                    {t("Cookies.Accept")}
                </Button>
            </Flex>
        </Flex>
    );
}
