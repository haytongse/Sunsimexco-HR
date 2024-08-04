import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import Colors from '../colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../button/Button';
import MainText from '../text/MainText';
export default ScreenModal = ({
  iconCenter,
  children,
  onPress,
  visible,
  onClose,
  onBackdropPress
}) => {
  return (
    <>
      <View style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity
          visible={visible}
          onPress={onPress}
          style={styles.buttonStyle}
        >
          <MaterialCommunityIcons name={"qrcode-scan"} color={Colors.DEFAULT_WHITE}
            size={50} />

        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={visible}
          onBackdropPress={onBackdropPress}
          style={styles.contentView}
        >
          <View style={styles.content}>
            {children}
          </View>
        </Modal>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.DEFAULT_ORANGE
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonStyle: {
    // height: 90,
    // width: 90,
    // backgroundColor: Colors.DEFAULT_PRIMARY,
    // borderRadius: 100
    width: 100,
    height: 100,
    backgroundColor: Colors.DEFAULT_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: Colors.DEFAULT_WHITE,
    // marginBottom: 10,
    shadowColor: Colors.DEFAULT_GRAY,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    elevation: 10,
    marginTop: -40
  }
});