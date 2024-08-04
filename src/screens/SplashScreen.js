import React,{useEffect} from 'react'
import { View, Image, StyleSheet} from 'react-native'
import Layout from '../component/layout/Layout'
import MainText from '../component/text/MainText'
import Button from '../component/button/Button'
import LoginScreen from './LoginScreen'
import Colors from '../component/colors/Colors'
import Images from '../component/images/Images';
const SplashScreen = ({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login');
        }, 3000);
    },[]);
  return (
    <Layout>
        <View style={styles.SplshContainer}>
            <Image source={Images.LOGO}  resizeMode='contain'
                style={styles.image}/>
        </View>
    </Layout>
  )
}
const styles = StyleSheet.create({
  image:{
    width: '50%', 
    height: '50%', 
    alignSelf: 'center'
  },
  SplshContainer: {
    flex: 1,
    justifyContent: 'center',
},
});
export default SplashScreen;