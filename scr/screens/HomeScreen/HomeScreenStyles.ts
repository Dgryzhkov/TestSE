import {StyleSheet} from 'react-native';
import {RNStyleType} from '../../shared/lib/Theme/GetThemeColorTypes';

interface IStyles {
  container: RNStyleType;
  image: RNStyleType;
  photographerText: RNStyleType;
  altText: RNStyleType;
  loadingIndicator: RNStyleType;
  noPhotosText: RNStyleType;
}

/**
 *
 * @return {IStyles}
 */
function getStyle(): IStyles {
  return StyleSheet.create({
    container: {flex: 1},
    image: {
      width: '100%',
      height: 200,
      marginVertical: 1,
    },
    photographerText: {
      textAlign: 'center',
      color: 'black',
    },
    altText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'black',
    },
    loadingIndicator: {
      marginVertical: 40,
    },
    noPhotosText: {
      textAlign: 'center',
      marginTop: 20,
    },
  });
}

export default getStyle;
