import {Badge, Box, Flex, Heading, Link, Text, Wrap} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {Card} from "../atoms/Card";

interface IProject {
    key: string;
    repo: string;
    tech: string[];
}

const projects: IProject[] = [
    {
        key: "Website",
        repo: "https://github.com/gizemceb/website.github.io",
        tech: ["React", "TypeScript", "Chakra UI", "react-router", "i18next"],
    },
    {
        key: "PokemonGame",
        repo: "https://github.com/gizemceb/pokemonGame",
        tech: ["JavaScript", "HTML", "CSS"],
    },
];

export default function Projects() {
    const {t} = useTranslation();

    return (
        <Box w={{base: "auto", lg: "62em"}} m="0 auto" pt="10em" pb="10em" px={{base: "4", lg: "0"}}>
            <Heading textAlign="center" fontFamily="mono" mb="10">
                {t("Projects.Title")}
            </Heading>

            <Flex direction="column" gap="8">
                {projects.map((project) => (
                    <Card key={project.key} p="8">
                        <Heading size="md" mb="2">
                            {t(`Projects.Items.${project.key}.Title`)}
                        </Heading>
                        <Text mb="4">
                            {t(`Projects.Items.${project.key}.Description`)}
                        </Text>
                        <Wrap mb="4">
                            {project.tech.map((tech) => (
                                <Badge key={tech} colorScheme="purple" borderRadius="full" px="3" py="1">
                                    {tech}
                                </Badge>
                            ))}
                        </Wrap>
                        <Link href={project.repo} isExternal color="red.500" fontWeight="600">
                            {t("Projects.ViewOnGithub")} →
                        </Link>
                    </Card>
                ))}
            </Flex>
        </Box>
    );
}
