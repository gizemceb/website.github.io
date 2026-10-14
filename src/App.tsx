import React, { useEffect } from 'react';
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "./i18n/en.json";
import tr from "./i18n/tr.json";
import { Language } from "./utils/language";
import { Analytics } from "./utils/analytics";
import { IRouteConfig, routes } from "./routers";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Empty } from "./components/templates/Empty";
import { CookieConsent } from "./components/organisms/CookieConsent";
import {
    ChakraProvider,
    CircularProgress,
    Flex,
} from "@chakra-ui/react";
import customTheme from "./theme/theme";

i18n.use(initReactI18next).init({
  resources: {
    en,
    tr,
  },
  lng: Language.get(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: true,
  },
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "b", "strong", "i"],
  },
});

// Keeps i18n language in sync with the URL (e.g. back/forward navigation,
// or landing directly on /en/contact) without ever reloading the page.
function LanguageSync() {
    const location = useLocation();

    useEffect(() => {
        const lang = Language.getFromPath(location.pathname) || Language.get();
        if (lang !== i18n.language) {
            i18n.changeLanguage(lang);
        }
    }, [location.pathname]);

    return null;
}

// GA's own auto-pageview only fires once on initial script load, so we send
// one ourselves on every client-side navigation.
function AnalyticsTracker() {
    const location = useLocation();

    useEffect(() => {
        Analytics.trackPageView(location.pathname + location.search);
    }, [location.pathname, location.search]);

    return null;
}

function App() {
    function renderRoutes() {
        return routes.map((route: IRouteConfig) => {
            const RouteComponent = route.component;
            return (
                <Route
                    key={route.key}
                    path={route.url}
                    element={
                        <Empty>
                            <RouteComponent />
                        </Empty>
                    }
                />
            );
        });
    }
    return (
        <React.Suspense
            fallback={
                <Flex
                    h="100vh"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    bg="black"
                >
                    <CircularProgress isIndeterminate color="white" />
                </Flex>
            }
        >
            <BrowserRouter>
                <ChakraProvider theme={customTheme}>
                    <LanguageSync />
                    <AnalyticsTracker />
                    <Routes>
                        {renderRoutes()}
                    </Routes>
                    <CookieConsent />
                </ChakraProvider>
            </BrowserRouter>
        </React.Suspense>
    );
}

export default App;
