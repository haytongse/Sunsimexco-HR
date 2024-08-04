import React from 'react';
import { StyleSheet, View } from 'react-native';
import Layout from '../component/layout/Layout';
import MainText from '../component/text/MainText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../component/colors/Colors';
const PermissionList = ({navigation}) => {
  return (
    <Layout>
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back-outline" size={25}
          color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
          onPress={() => navigation.goBack()}
        />
        <MainText title='ការស្នើច្បាប់របស់ខ្ញុំ' type='default' />
      </View>

    </Layout>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
});
export default PermissionList;
