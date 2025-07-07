import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';

type EditorRouteProp = RouteProp<RootStackParamList, 'Editor'>;

export default function EditorScreen() {
  const route = useRoute<EditorRouteProp>();
  const { id, shape, width, height } = route.params || {};

  const onImageSelected = (uri: string) => {
    console.log('Selected image:', uri);
  };

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const handleAddImage = () => {
    Alert.alert('Add Image', 'Choose source', [
      { text: 'Camera', onPress: pickFromCamera },
      { text: 'Library', onPress: pickFromLibrary },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Editor Screen</Text>
      {id && <Text>Design ID: {id}</Text>}
      {shape && (
        <Text>
          Shape: {shape} ({width}x{height})
        </Text>
      )}
      <Button title="Add Image" onPress={handleAddImage} />
    </View>
  );
}
