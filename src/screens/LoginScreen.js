import React, { useState, createContext, useEffect, useContext } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import MainText from '../component/text/MainText'
import Layout from '../component/layout/Layout'
import Button from '../component/button/Button';
import Loading from '../component/loading/Loading';
import InputText from '../component/input/InputText';
import Images from '../component/images/Images';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../component/colors/Colors';
import { useSelector, useDispatch } from "react-redux";
import { request } from '../util/request';
import { setProfile } from '../redux/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({ route, navigation }) => {
  const { profile } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [isPasswordShow, setPasswordShow] = useState(false);
  const [username, setUsername] = useState("");
  const [errUsername, setErrUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState(null);
  const [errLogin, setErrLogin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  // useEffect(() => {
  //   tokenLogin();
  // }, []);
  const handleLogin = async () => {
    setErrPassword(null);
    setErrUsername(null);
    setErrLogin(null);
    var isError = false;
    if (username == "") {
      setErrUsername("Please fill in username!");
      isError = true;
    } else if (password == "") {
      isError = true;
      setErrPassword("Please fill in password");
    }
    if (!isError) {
      var param = {
        name: username,
        password: password
      }
      //api login
      setLoading(true);
      await request("emp_login.php", "POST", param).then(res => {
        setLoading(false);
        if (res){
          if (res.result == 'wp') {
            setErrLogin("Incorrect password!");
          } else if (res.result == 'ko') {
            setErrLogin("Your account dose not exit!, Please contact admin.");
          } else {
            dispatch(setProfile(res));
          }
        }
      });
      
    }
  }
  return (
    <Layout loading={loading}>
      <View style={styles.loginContainer}>
        <Image source={Images.LOGO} resizeMode='contain' style={styles.image} />
        <View>
          <Text style={styles.textLogin}>Login </Text>
          {/* <MainText title={'Login:' + profile?.is_login}/> */}
          <InputText
            msError={errUsername}
            label={"Username"} placeholder={"Username"}
            onChangeText={(text) => {
              setUsername(text)
            }}
          />
          <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
              <InputText
                msError={errPassword}
                label={"Password"}
                placeholder={"Password"}
                secureTextEntry={isPasswordShow ? false : true}
                onChangeText={(text) => {
                  setPassword(text)
                }}
                iconRight={<Feather name='eye' size={20} />}
              />
            </View>
          </View>
          <Text style={{ color: 'red', marginBottom: 5 }}>{errLogin}</Text>
          <Button
            onPress={handleLogin}
            type='default'
            title={"Login"} />
        </View>
        {/* <View style={styles.orContainer}>
          <View style={styles.orHr} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>OR</Text>
          </View>
          <View style={styles.orHr} />
        </View> */}
        {/* <View style={styles.signinContainer}>
          <MainText title={`Don't have account?`} style={styles.txtSignin} />
          <TouchableOpacity activeOpacity={0.8} style={styles.btnSignin} onPress={() => { navigation.navigate('Singup') }}>
            <MainText title='Sign up' style={styles.txtbtnSignin} />
          </TouchableOpacity>

        </View> */}
      </View>
    </Layout >
  )
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  loginContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 100,
    // padding: 20
  },
  textLogin: {
    fontSize: 22,
    color: '#000',
    // fontWeight: 'bold',
    // marginBottom: 15,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  image: {
    height: '30%',
    alignSelf: 'center',
  },
  inputSubContainer: {
    // width: '91%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: Colors.DEFAULT_ORANGE,
    // borderRadius: 5,

  },
  inputText: {
    flex: 1,
    textAlignVertical: 'center',
    padding: 14,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
  },
  orHr: {
    flex: 1,
    height: 0.8,
    backgroundColor: Colors.DEFAULT_ORANGE
  },
  signinContainer: {
    flexDirection: 'row',
    marginTop: '5%',
    // alignSelf: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtSignin: {
    fontSize: 14,
    color: Colors.DEFAULT_RED,
    // marginBottom: '5%',
    marginRight: 20
  },
  btnSignin: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  txtbtnSignin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.DEFAULT_ORANGE
  }
});
export default LoginScreen;