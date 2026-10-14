import {Box} from "@chakra-ui/react";
import { Information } from "../organisms/Information/Information";

export default function Homepage() {
    return (
        <Box
            backgroundImage={`url("/assets/images/flowers.png")`}
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            w="100%"
        >
            <Information />
        </Box>
    );
}
