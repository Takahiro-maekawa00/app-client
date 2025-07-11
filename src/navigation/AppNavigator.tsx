import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '@screens/DashboardScreen';
import EditorScreen from '@screens/EditorScreen';
import GuideScreen from '@screens/GuideScreen';
import PreviewScreen from '@screens/PreviewScreen';
import ARPreviewScreen from '@screens/ARPreviewScreen';
import SettingsScreen from '@screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  Editor:
    | {
        id?: string;
        shape?: 'circle' | 'rectangle' | 'custom';
        width?: number;
        height?: number;
      }
    | undefined;
  Guide: { width?: number; height?: number; beadSize?: number } | undefined;
  Preview: undefined;
  ARPreview: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={DashboardScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
        <Stack.Screen name="ARPreview" component={ARPreviewScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
