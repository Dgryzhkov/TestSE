import {Dimensions, StyleSheet} from 'react-native';
import {RNStyleType} from '../../shared/lib/Theme/GetThemeColorTypes';

interface IStyles {
  container: RNStyleType;
  image: RNStyleType;
  loader: RNStyleType;
}
const {width, height} = Dimensions.get('window');
/**
 *
 * @return {IStyles}
 */
function getStyle(): IStyles {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    image: {
      width: width,
      height: height,
      resizeMode: 'contain',
      flex: 1,
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{translateX: -25}, {translateY: -25}],
    },
  });
}

export default getStyle;
