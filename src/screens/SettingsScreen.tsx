import React from 'react';
import { View, Text, Switch, Button } from 'react-native';
import { useRecoilState } from 'recoil';
import { languageState, darkModeState } from '@atoms/settings';
import i18n from '@i18n/index';

export default function SettingsScreen() {
  const [language, setLanguage] = useRecoilState(languageState);
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ja' : 'en';
    setLanguage(newLang);
    i18n.locale = newLang;
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>{i18n.t('settings_title')}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text>{i18n.t('language')}</Text>
        <Button title={language.toUpperCase()} onPress={toggleLanguage} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>{i18n.t('dark_mode')}</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
    </View>
  );
}
