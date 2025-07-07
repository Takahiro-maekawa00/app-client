import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';
import useOfflineStorage from '@hooks/useOffline';
import SizeSelectorModal, { ShapeType } from '@components/SizeSelectorModal';

interface DesignItem {
  id: string;
  thumbnailUrl: string;
  createdAt: string;
}

export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    data: cachedDesigns,
    save: saveCachedDesigns,
    loading: offlineLoading,
  } = useOfflineStorage<DesignItem[]>('designs');

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const response = await axios.get<DesignItem[]>('/designs');
        setDesigns(response.data);
        saveCachedDesigns(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [saveCachedDesigns]);

  const handleCreate = (params: { shape: ShapeType; width: number; height: number }) => {
    setModalVisible(false);
    navigation.navigate('Editor', params);
  };

  const handleCreate = (params: { shape: ShapeType; width: number; height: number }) => {
    setModalVisible(false);
    navigation.navigate('Editor', params);
  };

  const renderItem = ({ item }: { item: DesignItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Editor', { id: item.id })}>
      <Image source={{ uri: item.thumbnailUrl }} style={styles.thumb} />
      <Text style={styles.date}>{item.createdAt}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {(loading || offlineLoading) && designs.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={designs}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <View style={styles.createButton}>
        <Button title="Create New Design" onPress={() => setModalVisible(true)} />
      </View>
      <SizeSelectorModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 8 },
  item: { flex: 1, margin: 4, alignItems: 'center' },
  thumb: { width: 150, height: 150, borderRadius: 8, backgroundColor: '#ccc' },
  date: { marginTop: 4 },
  createButton: { padding: 8 },
});
