import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    home_title: 'My Designs',
    new_design: 'Create New',
    settings_title: 'Settings',
    language: 'Language',
    dark_mode: 'Dark Mode',
  },
  ja: {
    home_title: '保存済みデザイン',
    new_design: '新規作成',
    settings_title: '設定',
    language: '言語',
    dark_mode: 'ダークモード',
  },
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;
