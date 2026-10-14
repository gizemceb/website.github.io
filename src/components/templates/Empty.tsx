import {Box} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useTranslation} from 'react-i18next';
import { isCommonPage } from "../../utils/language";
import { Header } from "../organisms/Header";

export function Empty(props: any) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    try {
      const title = t(`MetaData.Title.${window?.location?.pathname}`, t('Title'));
      document.title = title;
      const htmlEl: any = document.querySelector('html');
      htmlEl.setAttribute('lang', i18n.language);
    } catch(err) {
      console.error('translation error', err);
    }
  }, [i18n.language]);

  return (
    <Box h="100vh">
      {
        !isCommonPage() && <Header />
      }
      <Box marginTop={{ base: isCommonPage() ? '0' : "64px", lg: isCommonPage() ? '0' : "75px" }}>{props.children}</Box>
    </Box>
  );
}
