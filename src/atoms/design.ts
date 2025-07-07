import { atom } from 'recoil';

export interface DesignElement {
  /** Unique identifier for this element */
  id: string;
  /**
   * Type of element being rendered. A minimal set of options is defined here
   * so screens can make assumptions about how to handle each element.
   */
  type: 'text' | 'image' | 'shape';
  /** Arbitrary content for the element. For text this is the string to display,
   * while for images it can be a URL.
   */
  content: string;
  /** Horizontal position on the design canvas */
  x: number;
  /** Vertical position on the design canvas */
  y: number;
  /** Degrees of rotation applied to the element */
  rotation?: number;
  /** Scale factor for the element */
  scale?: number;
}

export interface DesignData {
  id: string;
  name: string;
  elements: DesignElement[];
}

export const designState = atom<DesignData[]>({
  key: 'designState',
  default: [],
});
