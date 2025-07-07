import { atom } from 'recoil';

export const languageState = atom<string>({
  key: 'languageState',
  default: 'en',
});

export const darkModeState = atom<boolean>({
  key: 'darkModeState',
  default: false,
});
