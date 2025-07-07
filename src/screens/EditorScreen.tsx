import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';

type EditorRouteProp = RouteProp<RootStackParamList, 'Editor'>;

export default function EditorScreen() {
  const route = useRoute<EditorRouteProp>();
  const { id } = route.params || {};
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Editor Screen</Text>
      {id && <Text>Design ID: {id}</Text>}
    </View>
  );
}
