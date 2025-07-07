import { atom } from 'recoil';

export interface DesignData {
  id: string;
  name: string;
  elements: any[]; // TODO: define element types
}

export const designState = atom<DesignData[]>({
  key: 'designState',
  default: [],
});
