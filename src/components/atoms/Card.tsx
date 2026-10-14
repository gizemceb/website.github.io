import {Box, BoxProps} from "@chakra-ui/react";
import React from "react";

export function Card({children, ...rest}: BoxProps) {
    return (
        <Box
            bg="brand.cream"
            borderRadius="24px"
            border="1px solid"
            borderColor="blackAlpha.50"
            boxShadow="0 16px 40px -16px rgba(27, 27, 27, 0.18)"
            {...rest}
        >
            {children}
        </Box>
    );
}
