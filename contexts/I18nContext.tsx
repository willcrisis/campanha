import { useLocales } from 'expo-localization';
import get from 'lodash/get';
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import usePersistedState from '@/hooks/usePersistedState';
import ptBR from '@/assets/data/data.pt-br.json';
import enUS from '@/assets/data/data.en-us.json';
import ptBRTranslations from '@/assets/translations/pt-br.json';
import enUSTranslations from '@/assets/translations/en-us.json';
import { Menu } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import InputLabel from '@/components/inputs/InputLabel';
import InputView from '@/components/inputs/InputView';

const I18nContext = createContext({
  locale: 'pt-br',
  setLocale: (locale: string) => {},
  data: ptBR,
  translations: ptBRTranslations,
  translate: (key: string, params?: Record<string, string>) => key,
  ordinal: (number: string | number) => '' as string,
});

const ordinalEn = (number: string | number) => {
  const lastDigit = Number(number) % 10;
  const lastTwoDigits = Number(number) % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return `${number}th`;
  }
  switch (lastDigit) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
};

const ordinalPt = (number: string | number) => `${number}ª`;

const english = {
  ordinal: ordinalEn,
  data: enUS,
  translations: enUSTranslations,
};

const portuguese = {
  ordinal: ordinalPt,
  data: ptBR,
  translations: ptBRTranslations,
};

const I18nProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [deviceLocale] = useLocales();
  const [locale, setLocale] = usePersistedState('locale', deviceLocale.languageTag.toLowerCase());

  const { ordinal, data, translations } = useMemo(() => {
    if (locale.startsWith('en')) {
      return english;
    }
    return portuguese;
  }, [locale]);

  const translate = useCallback(
    (key: string, params?: Record<string, string>) => {
      const translation = get(translations, key);
      if (!translation) {
        return key;
      }
      if (params) {
        return translation.replace(/\{\{([^}]+)\}\}/g, (match: string, p1: string) => params[p1] || match);
      }
      return translation;
    },
    [translations],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, data, translations, translate, ordinal }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);

export const ChangeLanguageMenu = () => {
  const { locale, setLocale, translate } = useI18n();
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <InputView>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
          >
            <InputLabel>{translate('pages.config.language')}</InputLabel>
            <InputLabel>{translate('language.name')}</InputLabel>
          </TouchableOpacity>
        </InputView>
      }
    >
      <Menu.Item
        onPress={() => setLocale('pt-br')}
        title="Português (Brasil)"
        trailingIcon={locale.startsWith('pt') ? 'check' : undefined}
      />
      <Menu.Item
        onPress={() => setLocale('en-us')}
        title="English"
        trailingIcon={locale.startsWith('en') ? 'check' : undefined}
      />
    </Menu>
  );
};
export default I18nProvider;
