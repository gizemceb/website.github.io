const MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const CONSENT_KEY = "website_analytics_consent";

declare global {
    interface Window {
        dataLayer?: any[];
        gtag?: (...args: any[]) => void;
    }
}

let scriptLoaded = false;

function loadGtagScript(): void {
    if (scriptLoaded || !MEASUREMENT_ID) {
        return;
    }
    scriptLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
        window.dataLayer!.push(args);
    };
    // We send page_view ourselves on route change, since gtag's automatic
    // pageview only fires once on initial script load, not on client-side nav.
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {send_page_view: false});
}

export const Analytics = {
    getConsent: (): "granted" | "denied" | null => {
        const stored = localStorage.getItem(CONSENT_KEY);
        return stored === "granted" || stored === "denied" ? stored : null;
    },
    grantConsent: () => {
        localStorage.setItem(CONSENT_KEY, "granted");
        loadGtagScript();
    },
    denyConsent: () => {
        localStorage.setItem(CONSENT_KEY, "denied");
    },
    initIfConsented: () => {
        if (Analytics.getConsent() === "granted") {
            loadGtagScript();
        }
    },
    trackPageView: (path: string) => {
        if (Analytics.getConsent() !== "granted" || !window.gtag || !MEASUREMENT_ID) {
            return;
        }
        window.gtag("event", "page_view", {
            page_path: path,
            page_location: window.location.href,
        });
    },
};
