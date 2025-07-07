import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export type ShapeType = 'circle' | 'rectangle' | 'custom';

interface SizeSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (params: { shape: ShapeType; width: number; height: number }) => void;
}

export default function SizeSelectorModal({ visible, onClose, onSelect }: SizeSelectorModalProps) {
  const [shape, setShape] = useState<ShapeType>('circle');
  const [width, setWidth] = useState('300');
  const [height, setHeight] = useState('300');

  const handleSelect = () => {
    const w = parseInt(width, 10) || 0;
    const h = parseInt(height, 10) || 0;
    onSelect({ shape, width: w, height: h });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Select Size</Text>
          <View style={styles.shapes}>
            <TouchableOpacity
              style={[styles.shapeButton, shape === 'circle' && styles.active]}
              onPress={() => setShape('circle')}
            >
              <Text>Circle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.shapeButton, shape === 'rectangle' && styles.active]}
              onPress={() => setShape('rectangle')}
            >
              <Text>Rectangle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.shapeButton, shape === 'custom' && styles.active]}
              onPress={() => setShape('custom')}
            >
              <Text>Custom</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={width}
              onChangeText={setWidth}
              placeholder="Width"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              placeholder="Height"
            />
          </View>
          <View style={styles.actions}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Create" onPress={handleSelect} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  title: { fontSize: 18, marginBottom: 12, textAlign: 'center' },
  shapes: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  shapeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  active: { backgroundColor: '#def' },
  inputs: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
  },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
});
