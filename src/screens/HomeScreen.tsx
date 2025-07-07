import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import { useRecoilValue } from 'recoil';
import { designState } from '@atoms/design';
import i18n from '@i18n/index';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const designs = useRecoilValue(designState);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>{i18n.t('home_title')}</Text>
      <FlatList
        data={designs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Button
        title={i18n.t('new_design')}
        onPress={() => navigation.navigate('Editor')}
      />
    </View>
  );
}
