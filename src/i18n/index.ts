import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    home_title: 'My Designs',
    new_design: 'Create New',
  },
  ja: {
    home_title: '保存済みデザイン',
    new_design: '新規作成',
  },
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
