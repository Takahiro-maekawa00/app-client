import React, { useState } from 'react';
import { Modal, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export type ShapeOption = 'circle' | 'rectangle' | 'custom';

interface SizeSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (shape: ShapeOption, width: number, height: number) => void;
}

const DEFAULT_CIRCLE_SIZE = 200;
const DEFAULT_RECT_WIDTH = 200;
const DEFAULT_RECT_HEIGHT = 150;

export default function SizeSelectorModal({ visible, onClose, onSelect }: SizeSelectorModalProps) {
  const [shape, setShape] = useState<ShapeOption>('circle');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const handleSelect = () => {
    if (shape === 'circle') {
      onSelect('circle', DEFAULT_CIRCLE_SIZE, DEFAULT_CIRCLE_SIZE);
    } else if (shape === 'rectangle') {
      onSelect('rectangle', DEFAULT_RECT_WIDTH, DEFAULT_RECT_HEIGHT);
    } else {
      const w = parseInt(width, 10) || 0;
      const h = parseInt(height, 10) || 0;
      onSelect('custom', w, h);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Size</Text>
          <View style={styles.options}>
            {(['circle', 'rectangle', 'custom'] as ShapeOption[]).map((opt) => (
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
                placeholder="Width"
                value={width}
                onChangeText={setWidth}
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                placeholder="Height"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          )}
          <View style={styles.actions}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="OK" onPress={handleSelect} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#eee',
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

