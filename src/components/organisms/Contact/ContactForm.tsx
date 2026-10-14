import {
    Box, Button,
    Flex, FormControl, FormLabel, Heading,
    Input, VStack, Textarea, useToast
} from "@chakra-ui/react";
import React from 'react'
import {Formik, Field, getIn} from "formik";
import * as Yup from 'yup';
import {Trans, useTranslation} from "react-i18next";
import { send } from 'emailjs-com';
import {Card} from "../../atoms/Card";

export default function ContactForm() {
    const {t} = useTranslation();
    const toast = useToast();

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        message: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    function getStyles(errors: any, fieldName: string) {
        if (getIn(errors, fieldName)) {
            return {
                border: '1px solid red'
            }
        }
    }

    return (
        <Box w="100%">
            <Heading size="md" fontFamily="mono" mb="6" textAlign={{base: "center", lg: "left"}}>
                <Trans i18nKey="Contact.Message" />
            </Heading>

            <Card p={{base: 6, lg: 10}}>
                <Formik
                    initialValues={{
                        email: "",
                        firstName: "",
                        lastName: "",
                        message: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, {resetForm}) => {
                        send(
                            'service_mpdk7b4',
                            'template_09omxjv',
                            values,
                            'dbF9XEig3xE9x2TuG'
                        )
                            .then(() => {
                                toast({
                                    title: t("Contact.SendSuccess"),
                                    status: "success",
                                    duration: 4000,
                                    isClosable: true,
                                });
                                resetForm();
                            })
                            .catch(() => {
                                toast({
                                    title: t("Contact.SendError"),
                                    status: "error",
                                    duration: 4000,
                                    isClosable: true,
                                });
                            });
                    }}
                >
                    {({handleSubmit, errors}) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="stretch">
                                <Flex gap={4} direction={{base: "column", lg: "row"}}>
                                    <FormControl>
                                        <FormLabel htmlFor="firstName">
                                            <Trans i18nKey="Contact.FirstName"/>
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            variant="filled"
                                            style={getStyles(errors, 'firstName')}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="lastName">
                                            <Trans i18nKey="Contact.LastName"/>
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            variant="filled"
                                            style={getStyles(errors, 'lastName')}
                                        />
                                    </FormControl>
                                </Flex>

                                <FormControl>
                                    <FormLabel htmlFor="email">
                                        <Trans i18nKey="Contact.Email"/>
                                    </FormLabel>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                        style={getStyles(errors, 'email')}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="message">
                                        <Trans i18nKey="Contact.MailMessage"/>
                                    </FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="message"
                                        name="message"
                                        type="text"
                                        variant="filled"
                                        style={getStyles(errors, 'message')}
                                        height={"10em"}
                                    />
                                </FormControl>

                                <Button type="submit" colorScheme="purple" width="full">
                                    <Trans i18nKey="Contact.Send"/>
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Card>
        </Box>
    );
}
