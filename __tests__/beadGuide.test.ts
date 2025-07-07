import { calculateBeadGuide } from '../src/utils/beadGuide';

describe('calculateBeadGuide', () => {
  it('calculates guide for simple canvas', () => {
    const guide = calculateBeadGuide(10, 10, 1);
    expect(guide).toEqual({ rows: 10, columns: 10, neededBeads: 100, packs: 1 });
  });

  it('rounds down rows and columns', () => {
    const guide = calculateBeadGuide(30.5, 40.2, 5);
    expect(guide).toEqual({ rows: 8, columns: 6, neededBeads: 48, packs: 1 });
  });

  it('calculates multiple packs when needed', () => {
    const guide = calculateBeadGuide(100, 100, 1);
    expect(guide.packs).toBe(10);
  });
});
