import React from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../component/layout/Layout';
import MainText from '../component/text/MainText';
import Button from '../component/button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../component/colors/Colors';
import { useDispatch, useSelector } from 'react-redux';

const AddressScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  return (
    <Layout>
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back-outline" size={25}
          color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
          onPress={() => navigation.goBack()}
        />
        <MainText title='អាស័យដ្ឋាន' type='default' />
      </View>
      <View style={styles.addressContainer}>
        <View style={styles.pobContainer}>
            <Ionicons style={{paddingRight: 20}} name='home-outline' size={30} color={Colors.DEFAULT_ORANGE} />
          <View style={styles.pobText}>
            <MainText title={"ទីកន្លែងកំណើត"} style={{fontSize: 20,fontWeight: 'bold'}} />
            <MainText title={profile?.pob} />
          </View>
        </View>
        <View style={styles.hr}></View>
        <View style={styles.pobContainer}>
            <Ionicons style={{paddingRight: 20}} name='home-outline' size={30} color={Colors.DEFAULT_ORANGE} />
          <View style={styles.pobText}>
            <MainText title={"អាស័យដ្ឋានបច្ចុប្បន្ន"} style={{fontSize: 20,fontWeight: 'bold'}} />
            <MainText title={profile?.address} style={{fontWeight: 400}}/>
          </View>
        </View>
      </View>
    </Layout>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressContainer: {
    flex: 1,
    padding: 10,
    
  },
  pobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    color: Colors.DEFAULT_GREY
  },
  pobText:{
    color: Colors.DEFAULT_GREY
  },
  hr:{
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.DEFAULT_ORANGE,
    opacity: 0.3,
    marginBottom: 10,
  }

});
export default AddressScreen;
