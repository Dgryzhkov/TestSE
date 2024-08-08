import {StyleSheet} from 'react-native';
import {RNStyleType} from '../../shared/lib/Theme/GetThemeColorTypes';

interface IStyles {
  modalBackground: RNStyleType;
  modalContainer: RNStyleType;
  modalText: RNStyleType;
}
/**
 *
 * @return {IStyles}
 */
function getStyle(): IStyles {
  return StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'red',
    },
  });
}

export default getStyle;
