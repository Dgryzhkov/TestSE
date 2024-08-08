import React from 'react';
import {View, Text, Button, Modal} from 'react-native';
import {observer} from 'mobx-react-lite';
import photoStore from '../../app/store/store';
import getStyle from './CustomModalStyles';

const CustomModal = observer(() => {
  const styles = getStyle();
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={photoStore.showModal}
      onRequestClose={() => photoStore.closeModal()}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Сервер прервал соединение, скорее всего необходим VPN для
            подключения
          </Text>
          <Button title="Закрыть" onPress={() => photoStore.closeModal()} />
        </View>
      </View>
    </Modal>
  );
});

export default CustomModal;
