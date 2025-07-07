export interface BeadGuideInfo {
  rows: number;
  columns: number;
  neededBeads: number;
  packs: number;
}

/**
 * Calculate bead guide information for a rectangular canvas.
 * @param canvasW Width of the canvas in the same units as beadSize
 * @param canvasH Height of the canvas in the same units as beadSize
 * @param beadSize Size of an individual bead
 */
export function calculateBeadGuide(canvasW: number, canvasH: number, beadSize: number): BeadGuideInfo {
  const rows = Math.floor(canvasH / beadSize);
  const columns = Math.floor(canvasW / beadSize);
  const neededBeads = rows * columns;

  // Typical bead packs contain roughly 1000 beads
  const BEADS_PER_PACK = 1000;
  const packs = Math.ceil(neededBeads / BEADS_PER_PACK);

  return { rows, columns, neededBeads, packs };
}
