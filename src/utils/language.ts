import i18next from "i18next";
import {urlsCommon, urlsOut, urlsTR, urlsEN} from './urls';

const LANG_KEY = "website_lang";

export const urlObj: any = {
    tr: urlsTR,
    en: urlsEN,
};

export const isCommonPage = () => {
    return Object.values(urlsCommon).find(value => value === window?.location?.pathname);
};

const checkLanguage = (val: string) => {
    return ['en', 'tr'].includes(val) ? val : 'en';
};

const getLangFromPath = (pathname: string): string | null => {
    const segment = pathname.split('/')[1];
    return segment === 'tr' || segment === 'en' ? segment : null;
};

export const getLocalizedPath = (pathname: string, targetLang: string): string => {
    const lang = checkLanguage(targetLang);
    const index = Object.values(urlsTR).findIndex(value => value === pathname);
    const foundIndex = index > -1 ? index : Object.values(urlsEN).findIndex(value => value === pathname);

    if (foundIndex === -1) {
        return urlObj[lang].Homepage;
    }

    return Object.values(urlObj[lang])[foundIndex] as string;
};

export const Language = {
    getFromPath: getLangFromPath,
    setLanguage: (lang: string) => {
        const checked = checkLanguage(lang);
        i18next.changeLanguage(checked);
        localStorage.setItem(LANG_KEY, checked);
    },
    get: (): string => {
        const fromPath = getLangFromPath(window?.location?.pathname || '');
        if (fromPath) {
            return fromPath;
        }

        const stored = localStorage.getItem(LANG_KEY);
        if (stored) {
            return checkLanguage(stored);
        }

        return checkLanguage(window?.navigator?.language?.split("-")[0] || 'en');
    },
};

export const useLocalizedUrls = () => {
    const lang = checkLanguage(i18next.language);
    return {...urlObj[lang], ...urlsOut, ...urlsCommon};
};
