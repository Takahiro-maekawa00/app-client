import React from 'react';
import { View, Text } from 'react-native';

export default function EditorScreen({ route }) {
  const { id } = route.params || {};
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Editor Screen</Text>
      {id && <Text>Design ID: {id}</Text>}
    </View>
  );
}
