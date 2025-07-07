import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export type ShapeType = 'circle' | 'rectangle' | 'custom';

interface SizeSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (params: { shape: ShapeType; width: number; height: number }) => void;
}

const DEFAULT_CIRCLE_SIZE = 200;
const DEFAULT_RECT_WIDTH = 200;
const DEFAULT_RECT_HEIGHT = 150;

export default function SizeSelectorModal({ visible, onClose, onSelect }: SizeSelectorModalProps) {
  const [shape, setShape] = useState<ShapeType>('circle');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleSelect = () => {
    if (shape === 'circle') {
      onSelect({ shape, width: DEFAULT_CIRCLE_SIZE, height: DEFAULT_CIRCLE_SIZE });
    } else if (shape === 'rectangle') {
      onSelect({ shape, width: DEFAULT_RECT_WIDTH, height: DEFAULT_RECT_HEIGHT });
    } else {
      const w = parseInt(width, 10) || 0;
      const h = parseInt(height, 10) || 0;
      onSelect({ shape, width: w, height: h });
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Size</Text>
          <View style={styles.options}>
            {(['circle', 'rectangle', 'custom'] as ShapeType[]).map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.option, shape === opt && styles.selectedOption]}
                onPress={() => setShape(opt)}
              >
                <Text>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {shape === 'custom' && (
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
          )}
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
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  title: { fontSize: 18, marginBottom: 12, textAlign: 'center' },
  options: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  option: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedOption: { backgroundColor: '#def' },
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
