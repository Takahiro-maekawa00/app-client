import React, { useState } from 'react';
import { View, Button, Linking, Share } from 'react-native';
import QrCodeButton from '@components/QrCodeButton';
import { exportToPdf, Layer } from '@services/exportService';

export default function PreviewScreen() {
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  const handleExport = async () => {
    const layers: Layer[] = [
      {
        type: 'text',
        text: 'Sample Design',
        x: 72,
        y: 700,
        color: '#000000',
        fontSize: 24,
      },
    ];

    try {
      const path = await exportToPdf(layers);
      setPdfPath(path);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = () => {
    if (pdfPath) {
      Linking.openURL(`file://${pdfPath}`);
    }
  };

  const handleShare = () => {
    if (pdfPath) {
      Share.share({ url: `file://${pdfPath}` });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Export to PDF" onPress={handleExport} />
      {pdfPath && (
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <QrCodeButton url={`file://${pdfPath}`} onPress={handleOpen} />
          <View style={{ marginTop: 8 }}>
            <Button title="Open PDF" onPress={handleOpen} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Button title="Share PDF" onPress={handleShare} />
          </View>
        </View>
      )}
    </View>
  );
}
