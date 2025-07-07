import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export interface Layer {
  type: 'text' | 'image';
  x: number;
  y: number;
  text?: string;
  uri?: string;
  width?: number;
  height?: number;
  color?: string;
  fontSize?: number;
}

/**
 * Export provided layers to a 300 DPI PDF and return the file path.
 */
export async function exportToPdf(layers: Layer[]): Promise<string> {
  const DPI = 300;
  const widthInches = 8.5;
  const heightInches = 11;
  const pageWidth = widthInches * DPI;
  const pageHeight = heightInches * DPI;

  let page = PDFPage.create().setMediaBox(pageWidth, pageHeight);

  layers.forEach((layer) => {
    if (layer.type === 'text' && layer.text) {
      page = page.drawText(layer.text, {
        x: layer.x,
        y: layer.y,
        color: layer.color || '#000000',
        fontSize: layer.fontSize || 12,
      });
    } else if (layer.type === 'image' && layer.uri) {
      page = page.drawImage(layer.uri, {
        x: layer.x,
        y: layer.y,
        width: layer.width,
        height: layer.height,
      });
    }
  });

  const docsDir = PDFLib.getDocumentsDirectory();
  const pdfPath = `${docsDir}/design-${Date.now()}.pdf`;

  await PDFDocument.create(pdfPath).addPages(page).write();

  return pdfPath;
}
