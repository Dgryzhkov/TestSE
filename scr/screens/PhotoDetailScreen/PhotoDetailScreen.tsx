import {RouteProp} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {View, Image, ActivityIndicator, ImageStyle} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import getStyle from './PhotoDetailScreenStyles';

type RootStackParamList = {
  Home: undefined;
  PhotoDetail: {photoUrl: string};
};

type PhotoDetailScreenProps = {
  route: RouteProp<RootStackParamList, 'PhotoDetail'>;
};

const PhotoDetailScreen: React.FC<PhotoDetailScreenProps> = ({route}) => {
  const {photoUrl} = route.params;

  const styles = getStyle();

  const [loading, setLoading] = useState(true);
  const scale = useSharedValue(1);
  const lastScale = useRef(1);

  const onPinchEvent = (event: {nativeEvent: {scale: number | undefined}}) => {
    if (event.nativeEvent.scale !== undefined) {
      scale.value = lastScale.current * event.nativeEvent.scale;
    }
  };

  const onPinchStateChange = (event: {nativeEvent: {state: number}}) => {
    if (event.nativeEvent.state === State.END) {
      lastScale.current = scale.value;
      scale.value = withSpring(lastScale.current);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}>
        <Animated.View style={animatedStyle}>
          <Image
            source={{uri: photoUrl}}
            style={styles.image as ImageStyle}
            resizeMode="contain"
            onLoadEnd={() => setLoading(false)}
            onError={error => {
              console.log(
                'Ошибка загрузки изображения:',
                error.nativeEvent.error,
              );
              setLoading(false);
            }}
          />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

export default PhotoDetailScreen;
