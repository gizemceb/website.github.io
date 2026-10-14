import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
    fonts: {
        body: "'Rubik', sans-serif",
        heading: "'Rubik', sans-serif",
        mono: "'Source Code Pro', monospace",
    },
    colors: {
        black: "#1b1b1b",
        brand: {
            cream: "#FAF7F0",
            lavender: "#CBC3E3",
            ink: "#1b1b1b",
        },
        red: {
            100: "#ffa2a2",
            200: "#ffa2a2",
            300: "#ff8888",
            400: "#ff6f6f",
            500: "#ff5555",
            600: "#ff3c3c",
            700: "#ff2222",
            800: "#ff0808",
        },
    },
});
