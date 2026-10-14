import {Box, Flex, Text, Image, Link} from "@chakra-ui/react";
import React from "react";

interface IData {
    link: string,
    picUrl: string,
    text: string,
    header: string,
}

interface IBadgeList {
    data?: IData[]
}

const BadgeItem: React.FC<IBadgeList> = ({data}) => {
    const renderBadges = () => {
        return data?.map((item) => {
            return (
                <Box key={item.link + item.header} textAlign="center" minW="100px">
                    <Link href={item.link} isExternal>
                        <Image
                            display={"block"}
                            marginLeft={"auto"}
                            marginRight={"auto"}
                            borderRadius='full'
                            boxSize='50px'
                            src={item.picUrl}
                            alt={item.header}
                        />
                    </Link>
                    <Text fontWeight='bold' align={"center"} mt="2">
                        {item.header}
                    </Text>
                    <Text fontSize='sm' color="blackAlpha.700">{item.text}</Text>
                </Box>
            )
        }) || null;
    }
    return (
        <Flex flexWrap="wrap" justifyContent="center" gap="8" padding="10px">
            {renderBadges()}
        </Flex>
    );
}

export default BadgeItem;

// author is gizem cebi :D
