import {Heading, Image, Text} from "@chakra-ui/react";
import React from "react";
import {Trans, useTranslation} from "react-i18next";
import BadgeItem from "../../molecules";
import {Card} from "../../atoms/Card";

export function Badges() {
    const {t} = useTranslation();
    return (
        <Card p={{base: 6, lg: 10}} textAlign="center">
            <Image
                src="/assets/images/profilepic.png"
                alt="Gizem Çebi"
                borderRadius="full"
                boxSize={{base: "120px", lg: "160px"}}
                objectFit="cover"
                mx="auto"
                mb="4"
            />

            <Heading size="md" fontFamily="mono" mb="1">
                <Trans i18nKey="Contact.Info" />
            </Heading>
            <Text color="blackAlpha.700" mb="6">
                <Trans i18nKey="Contact.EmailAddress" />
            </Text>

            <BadgeItem data={[
                {
                    picUrl: "/assets/images/github.png",
                    link: "https://github.com/gizemceb",
                    header: "gizemceb",
                    text: t("Contact.PositionTitle")
                },
                {
                    picUrl: "/assets/images/linkedin.png",
                    link: "https://www.linkedin.com/in/gizemcebi/",
                    header: "gizemcebi",
                    text: t("Contact.PositionTitle")
                }
            ]}/>
        </Card>
    );
}
