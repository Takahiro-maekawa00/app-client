import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';
import { calculateBeadGuide } from '@utils/beadGuide';

type GuideRouteProp = RouteProp<RootStackParamList, 'Guide'>;

export default function GuideScreen() {
  const route = useRoute<GuideRouteProp>();
  const {
    width = 210,
    height = 297,
    beadSize = 5,
  } = route.params || {};

  const guide = calculateBeadGuide(width, height, beadSize);

  return (
    <View style={styles.container}>
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.text}>Rows: {guide.rows}</Text>
        <Text style={styles.text}>Columns: {guide.columns}</Text>
        <Text style={styles.text}>Total Beads: {guide.neededBeads}</Text>
        <Text style={styles.text}>Estimated Packs: {guide.packs}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 8,
  },
  text: { color: '#fff', fontSize: 16, marginVertical: 2 },
});
