import {Box, Flex} from "@chakra-ui/react";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import {Card} from "../../atoms/Card";

export function Information() {
    useTranslation();

    return (
        <Flex
            minH={{base: "auto", lg: "100vh"}}
            w="100%"
            justifyContent="center"
            alignItems="center"
            px={{base: 5, lg: 0}}
            py={{base: "8em", lg: 0}}
        >
            <Card
                maxW={{base: "100%", lg: "40em"}}
                p={{base: 8, lg: 12}}
                textAlign="center"
                bg="whiteAlpha.900"
            >
                <Box
                    as="h1"
                    fontSize={{base: "xl", lg: "2xl"}}
                    fontWeight="800"
                    lineHeight="1.4"
                    fontFamily="mono"
                >
                    <Trans i18nKey="HomePage.Information" />
                </Box>
                <Box
                    as="p"
                    fontSize={{base: "md", lg: "lg"}}
                    fontWeight="500"
                    lineHeight="1.8"
                    mt="6"
                >
                    <Trans i18nKey="HomePage.Summary" />
                </Box>
            </Card>
        </Flex>
    );
}
