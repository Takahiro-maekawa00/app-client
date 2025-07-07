import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ViroARSceneNavigator, ViroARScene, ViroARPlaneSelector, ViroNode, ViroQuad, ViroMaterials } from '@viro-community/react-viro';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';

type ARPreviewRouteProp = RouteProp<RootStackParamList, 'ARPreview'>;

interface PlaneSceneProps {
  designUri?: string;
}

const PlaneScene: React.FC<PlaneSceneProps> = ({ designUri }) => {
  const [scale, setScale] = useState<[number, number, number]>([1, 1, 1]);
  const lastScale = useRef(1);

  useEffect(() => {
    if (designUri) {
      ViroMaterials.createMaterials({
        design: {
          diffuseTexture: { uri: designUri },
        },
      });
    }
  }, [designUri]);

  const handlePinch = (pinchState: number, scaleFactor: number) => {
    if (pinchState === 1) {
      lastScale.current = scale[0];
    } else if (pinchState === 2) {
      const newScale = lastScale.current * scaleFactor;
      setScale([newScale, newScale, newScale]);
    }
  };

  return (
    <ViroARScene>
      <ViroARPlaneSelector>
        <ViroNode onPinch={handlePinch} scale={scale} dragType="FixedDistance">
          <ViroQuad
            rotation={[-90, 0, 0]}
            width={1}
            height={1}
            materials={designUri ? ['design'] : undefined}
          />
        </ViroNode>
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

export default function ARPreviewScreen() {
  const route = useRoute<ARPreviewRouteProp>();
  const { designUri } = route.params || {};

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus
        initialScene={{ scene: () => <PlaneScene designUri={designUri} /> }}
        style={styles.navigator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  navigator: { flex: 1 },
});

