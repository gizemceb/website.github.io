import {Box, Heading, Link, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {Link as RouterLink} from "react-router-dom";
import {Card} from "../atoms/Card";
import {useLocalizedUrls} from "../../utils/language";

export default function NotFound() {
    const {t} = useTranslation();
    const urls = useLocalizedUrls();

    return (
        <Box
            w={{base: "auto", lg: "40em"}}
            m="0 auto"
            pt="12em"
            pb="12em"
            px={{base: "4", lg: "0"}}
            textAlign="center"
        >
            <Card p={{base: 8, lg: 12}}>
                <Heading size="2xl" fontFamily="mono" mb="4">
                    {t("NotFound.Title")}
                </Heading>
                <Text fontSize="lg" mb="6">
                    {t("NotFound.Message")}
                </Text>
                <Link as={RouterLink} to={urls.Homepage} color="red.500" fontWeight="600">
                    {t("NotFound.BackHome")} →
                </Link>
            </Card>
        </Box>
    );
}
