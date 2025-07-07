import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native';

interface QrCodeButtonProps {
  url: string;
  size?: number;
  onPress?: () => void;
}

export default function QrCodeButton({ url, size = 160, onPress }: QrCodeButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <QRCode value={url} size={size} />
    </TouchableOpacity>
  );
}
