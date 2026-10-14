import {Box, VStack} from "@chakra-ui/react";
import ContactForm from "../organisms/Contact/ContactForm";
import {Badges} from "../organisms/Badges/Badges";

export default function Contact() {
    return (
        <Box w={{base: "auto", lg: "62em"}} m="0 auto" pt="10em" pb="10em" px={{base: "4", lg: "0"}}>
            <VStack spacing={12} align="stretch">
                <ContactForm/>
                <Badges/>
            </VStack>
        </Box>
    );
}
