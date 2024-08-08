import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  RefreshControl,
  ImageStyle,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {observer} from 'mobx-react-lite';

import getStyle from './HomeScreenStyles';
import photoStore from '../../app/store/store';
import CustomModal from '../../widget/CustomModal';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  PhotoDetail: {photoUrl: string};
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = observer(({}) => {
  const [isConnected, setIsConnected] = useState(true);
  const navigation = useNavigation<NavigationProps>();

  const styles = getStyle();

  const handleRefresh = useCallback(() => {
    photoStore.reset();
    if (isConnected) {
      photoStore.fetchPhotos();
    }
  }, [isConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      if (state.isConnected) {
        handleRefresh();
      }
    });

    return () => unsubscribe();
  }, [handleRefresh, isConnected]);

  const handleLoadMore = () => {
    if (!photoStore.loading && isConnected) {
      photoStore.fetchPhotos();
    }
  };

  const handlePhotoPress = (photoUrl: string) => {
    navigation.navigate('PhotoDetail', {photoUrl});
  };

  return (
    <View style={styles.container}>
      {photoStore.loading && (
        <ActivityIndicator
          size="large"
          color="black"
          style={styles.loadingIndicator}
        />
      )}

      {!photoStore.loading && !isConnected && (
        <Text style={styles.noPhotosText}>
          Нет подключения к интернету, если при подключении данные не
          подгрузились перезайдите пожалйста в приложение
        </Text>
      )}

      {!photoStore.loading && isConnected && photoStore.photos.length === 0 && (
        <Text style={styles.noPhotosText}>Нет доступных фотографий</Text>
      )}

      {!photoStore.loading && isConnected && photoStore.photos.length > 0 && (
        <FlatList
          data={photoStore.photos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handlePhotoPress(item.src.original)}>
              <Image
                source={{uri: item.src.original}}
                style={styles.image as ImageStyle}
              />
              <Text style={styles.photographerText}>{item.photographer}</Text>
              {item.alt ? <Text style={styles.altText}>{item.alt}</Text> : null}
            </TouchableOpacity>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={photoStore.loading}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
      <CustomModal />
    </View>
  );
});

export default HomeScreen;
