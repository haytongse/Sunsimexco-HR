// import React, { useState } from 'react';
// import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView } from 'react-native';
// import MainText from '../text/MainText';
// import Layout from '../layout/Layout';
// import Button from '../button/Button';

// const ModalContain = ({
//     title = 'title',
//     visible,
//     onClose,
//     children
// }) => {
//     const [modalVisible, setModalVisible] = useState(false);
//     return (
//             <View style={styles.centeredView}>
//                 <Modal
//                     animationType="fade"
//                     transparent={true}
//                     visible={visible}
//                 >
//                     <View style={styles.centeredView}>
//                         <View style={styles.modalView}>
//                             <View style={styles.modalHeader}>
//                                 <MainText type={"main"} title={title} />
//                                 {/* <Pressable
//                                 onPress={onClose}
//                             >
//                                 <MainText

//                                     title='Close' />
//                             </Pressable> */}
//                                 <Button
//                                     size='sm'
//                                     type='warning'
//                                     title={"Close"}
//                                     onPress={onClose}
//                                 />
//                             </View>
//                             <View style={styles.containChild}>
//                                 {children}
//                             </View>
//                         </View>
//                     </View>
//                 </Modal>
//             </View>
//     );
// };

// const styles = StyleSheet.create({
//     containChild: {
//         // marginTop: 10,
//         backgroundColor: '#eee',
//         paddingHorizontal: 20,
//         paddingVertical: 20,
//     },
//     modalHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         borderBottomWidth: 1,
//         borderBottomColor: '#888',
//         paddingHorizontal: 20,
//         alignItems: 'center'
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 50,

//     },
//     modalView: {
//         width: '100%',
//         height: '100%',
//         // margin: 20,
//         backgroundColor: 'white',
//         // borderRadius: 20,
//         // padding: 35,
//         // alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         // shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
// });

// export default ModalContain;


import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Modal from 'react-native-modal';
import Colors from '../colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../button/Button';
import MainText from '../text/MainText';
export default ModalContain = ({
  iconCenter,
  children,
  onPress,
  visible,
  onClose,
  onBackdropPress,
  image
}) => {
  return (
    <>
    <View>
        <TouchableOpacity
          visible={visible}
          onPress={onPress}
        >
            {image}
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
