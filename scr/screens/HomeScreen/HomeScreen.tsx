import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  ImageStyle,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import photoStore from '../../app/store/store';
import {useNavigation} from '@react-navigation/native';

import {StackNavigationProp} from '@react-navigation/stack';
import getStyle from './HomeScreenStyles';
import CustomModal from '../../widget/CustomModal';
import Domains from '../../shared/config/Domains';

type RootStackParamList = {
  Home: undefined;
  PhotoDetail: {photoUrl: string};
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = observer(() => {
  const navigation = useNavigation<NavigationProps>();
  const styles = getStyle();
  useEffect(() => {
    photoStore.fetchPhotos();
  }, []);

  const handleLoadMore = () => {
    if (!photoStore.loading) {
      photoStore.fetchPhotos();
    }
  };

  const handleRefresh = () => {
    photoStore.reset();
    photoStore.fetchPhotos();
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

      {!photoStore.loading && photoStore.photos.length === 0 && (
        <Text style={styles.noPhotosText}>Нет доступных фотографий</Text>
      )}

      {!photoStore.loading && photoStore.photos.length > 0 && (
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
