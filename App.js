import React, { useEffect, useState } from 'react'
import { Alert, Text, View, Modal, TouchableOpacity, Animated, StyleSheet, Image, Linking, Button as Buttonn, ActivityIndicator, Platform, TurboModuleRegistry, PermissionsAndroid } from 'react-native'
import { createStackNavigator, TransitionPreset } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import QrcodeScreen from './src/screens/QrCodeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import PermissionScreen from './src/screens/PermissionScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import AddressScreen from './src/screens/AddressScreen';
import { useSelector, useDispatch } from 'react-redux';
import HistoryByMonth from './src/screens/HistoryByMonth';
import Colors from './src/component/colors/Colors';
import PermissionLong from './src/screens/PermissionLong';
import PermissionShort from './src/screens/PermissionShort';
import PermissionList from './src/screens/PermissionList';
import { setProfile } from '../redux/profileSlice';
import { request } from './src/util/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmpInfo from './src/screens/EmpInfo';
import Tap from '@react-navigation/bottom-tabs';
import Button from './src/component/button/Button';
import { CameraScreen, CameraType } from 'react-native-camera-kit';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainText from './src/component/text/MainText';
import { image_path } from './src/util/service';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import RootNavigation from "./src/screens/RootNavigation";
import { createLinking } from '@react-navigation/native';
import Loading from './src/component/loading/Loading';
import ModalContain from './src/component/modal/ModalContain';
import ScreenModal from './src/component/modal/ScreenModal';
import RenderModalScan from './src/screens/RenderModalScan';
import Images from './src/component/images/Images';
import Permissions from './src/screens/Permissions';
import FastImage from 'react-native-fast-image';
import LoaderImage from './src/screens/LoaderImage';
import AllEmployee from './src/screens/AllEmployee';
import AllAttandances from './src/screens/AllAttandances';
import AllPermissions from './src/screens/AllPermissions';
import PersonalInfo from './src/screens/PersonalInfo';
import EmpInfoByShowrooms from './src/screens/EmpInfoByShowrooms';
import AttByShowrooms from './src/screens/AttByShowrooms';
import PermissionByShowrooms from './src/screens/PermissionByShowrooms';
import QrCodeByShowroom from './src/screens/QrCodeByShowroom';
import SignupScreen from './src/screens/SignupScreen';


const App = ({ props }) => {
  const { is_login, access_token } = useSelector(state => state.profile);
  const { profile } = useSelector(state => state.profile);
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  // const [visible, setVisible] = React.useState(false);
  const [visibleSmall, setVisibleSmall] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [opneScanner, setOpneScanner] = useState(false);
  const [cameraPermission, setCameraPermission] = useState();
  const [qrcode, setQrCode] = useState(true);
  const [date, setDate] = useState('');
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [ress, setRes] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('.');
  const [currentLatitude, setCurrentLatitude] = useState('.');
  const [locationStatus, setLocationStatus] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState('')
  const [project, setProject] = useState('');
  const [meter, setMeter] = useState(0);
  const [shift, setShift] = useState('');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // checkCameraPermission();
    setIsButtonDisabled(false);
    // getProject();
    // getShifts();
    // getOneTimeLocation();
    var date = moment()
      .utc('+05:30')
      .format('DD/MM/yyy');
    var time = moment()
      .utc('+05:30')
      .format('HH:mm:ss');
    setCurrentDate(date);
    setCurrentTime(time);
    getOneTimeLocation();
    requestLocationPermission();
    subscribeLocationLocation();
    return () => {
      Geolocation.clearWatch(watchID);
    };
    
  }, []);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } 
    // else if (Platform.OS === 'ios') {
    //   getOneTimeLocation();
    //   subscribeLocationLocation();
    // } 
    else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
          
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          subscribeLocationLocation();
        } else {
          getOneTimeLocation();
          subscribeLocationLocation();
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    
  };

  const onSave = () => {
    getProject();
    getShifts();
    // alert(shift.count);
    var size = project?.size_scan;
    var project_name = project?.project_name;
    var beginningin = shift?.beginningin;
    var emp_shift_id = shift?.emp_shift_id;
    if (profile?.role_as != 1) {
      if (shift.count >= 6) {
        Alert.alert('មិនអាចស្គែនទៀតបានទេ​!', 'អនុញ្ញាត្តិ​ត្រឹមតែ​ 6 ' + ' ដង សូមរងចាំថ្ងៃបន្ទាប់!', [
          { text: "Cancel", }
        ]);
      } else {
        if (shift.emp_shift_id === 0 || shift.emp_shift_id === null || shift.emp_shift_id === "") {
          Alert.alert('បុគ្គលិក​ មិនទាន់មាន​ Shift Schedules!', 'សូមធ្វើការ​កែប្រែឈ្មោះ ​' + profile.name + 'ម្តងទៀត!', [
            { text: "Cancel", }
          ]);
        } else if (project_name != qrvalue || project_name == null) {
          Alert.alert('សូមពិនិត្យ​មើល​​ សាខា របស់អ្នកឡើងវិញ​!', 'អនុញ្ញាត្តិស្គែនបានតែ ​' + project_name, [
            { text: "Cancel", }
          ]);
        } else if (meter > size) {
          Alert.alert('សូមពិនិត្យ​មើល​ចំងាយ​​ ទីតាំង របស់អ្នកឡើងវិញ​!', 'អនុញ្ញាត្តិត្រឹម ​' + size + 'ម៉ែត្រ', [
            { text: "Cancel", }
          ]);
        } else if (meter == '') {
          alert('សូមបើក​ Location របស់អ្នកឡើងវិញ​ មុននឹងស្គែន​!', [
            { text: "Cancel", }
          ]);
        } else {
          if (shift.count == 0) {
            if (currentTime >= beginningin) {
              Alert.alert('សូមស្គែនម្តងទៀត​!', 'អនុញ្ញាត្តិ​ចាប់ពីម៉ោង​ ' + beginningin + ' ទៅ', [
                { text: "Cancel", }
              ]);
            } else {
              var params = {
                project_name: qrvalue,
                emp_id: profile.id,
                userid: profile.name,
                // state: 'C/In',
                meter_scan: meter,
              }
              setLoading(true);
              setIsButtonDisabled(true)
              request("save_attendance.php", "POST", params).then(res => {
                setLoading(false);
                // if (res) {
                //   setMessage(res);
                //   setVisible(false);
                // }
                if (res) {
                  setTimeout(() => {
                    setIsButtonDisabled(false);
                    setLoading(true);
                    setMessage(res);
                    setVisible(false);
                  }, 1500);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else if (shift.count == 1) {
            // if (currentTime >= shift.endingin) {
            if (currentTime < shift.endingin) {
              Alert.alert('មិនអនុញ្ញាត្តិ​អោយស្គែនចូលបានទេ​!', 'មិនទាន់ដល់ម៉ោងចេញ​ ', [
                { text: "Cancel", }
              ]);
            } else {
              var params = {
                project_name: qrvalue,
                emp_id: profile.id,
                userid: profile.name,
                // state: 'C/In',
                meter_scan: meter,
              }
              setLoading(true);
              setIsButtonDisabled(true)
              request("save_attendance.php", "POST", params).then(res => {
                // setLoading(false);
                // if (res) {
                //   setMessage(res);
                //   setVisible(false);
                // }
                if (res) {
                  setTimeout(() => {
                    setIsButtonDisabled(false);
                    setLoading(true);
                    setMessage(res);
                    setVisible(false);
                  }, 1500);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else if (shift.count == 2) {
            var params = {
              project_name: qrvalue,
              emp_id: profile.id,
              userid: profile.name,
              // state: 'C/In',
              meter_scan: meter,
            }
            setLoading(true);
            setIsButtonDisabled(true);
            request("save_attendance.php", "POST", params).then(res => {
              // setLoading(false);
              // if (res) {
              //   setMessage(res);
              //   setVisible(false);
              // }
              if (res) {
                setTimeout(() => {
                  setIsButtonDisabled(false);
                  setLoading(true);
                  setMessage(res);
                  setVisible(false);
                }, 1500);
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            if (currentTime >= shift.endingout) {
              Alert.alert('មិនអាចស្គែនបានទេ​!', 'អនុញ្ញាត្តិ​ចាប់ពីម៉ោង​ ' + shift.endingout + ' ទៅ', [
                { text: "Cancel", }
              ]);
            } else {
              var params = {
                project_name: qrvalue,
                emp_id: profile.id,
                userid: profile.name,
                // state: 'C/In',
                meter_scan: meter,
              }
              setLoading(true);
              setIsButtonDisabled(true);
              request("save_attendance.php", "POST", params).then(res => {
                // setLoading(false);
                // if (res) {
                //   setMessage(res);
                //   setVisible(false);
                // }
                if (res) {
                  setTimeout(() => {
                    setIsButtonDisabled(false);
                    setLoading(true);
                    setMessage(res);
                    setVisible(false);
                  }, 1500);
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        }
      }
    } else {
      var params = {
        project_name: qrvalue,
        emp_id: profile.id,
        userid: profile.name,
        // state: 'C/In',
        meter_scan: meter,
      }
      setLoading(true);
      setIsButtonDisabled(true);
      request("save_attendance.php", "POST", params).then(res => {
        if (res) {
          setTimeout(() => {
            setIsButtonDisabled(false);
            setLoading(true);

            // setMessage(res);
            setVisible(false);
            // setCurrentDate('');
            // setCurrentTime();
            // setCurrentLatitude('.');
            // setCurrentLongitude('.');
          }, 1500);

        } else {
          setVisible(false);
          setIsButtonDisabled(false);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
  const getProject = () => {
    var params = {
      id: profile?.project_id,
    }
    setLoading(true);
    request("get_project.php", "POST", params).then(res => {
      setLoading(false);
      if (res) {
        setProject(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const getShifts = () => {
    var params = {
      id: profile?.id,
      emp_id: profile?.id,
    }
    setLoading(true);
    request("get_shift.php", "POST", params).then(res => {
      setLoading(false);
      if (res) {
        setShift(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };
  const renderModalScan = () => {
    return (
      <View style={{ width: '100%', height: '81.5%', padding: 0, marginBottom: 20, justifyContent: 'center', alignSelf: 'center' }}>
        {qrvalue == '' ?
          <CameraScreen
            showFrame={true}
            scanBarcode={true}
            laserColor={Colors.DEFAULT_ORANGE}
            frameColor={Colors.DEFAULT_ORANGE}
            colorForScannerFrame={'transparent'}
            ref={(ref) => (this.camera = ref)}
            cameraType={CameraType.Back}
            onReadCode={(event) => onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />

          : <>
            <View style={styles.container}>
              <MainText title={'ស្គែន​ វត្តមាន'} type='main_title' />
              <TouchableOpacity style={styles.profileImgContainer}>
                <View>
                  {/* <Image source={{ uri: `${image_path + profile?.image}` }} style={styles.profileImg} /> */}
                  <FastImage source={{
                    uri: image_path + profile?.image,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.cacheOnly
                  }} style={styles.profileImg} />
                </View>
              </TouchableOpacity>
              <View style={{ marginTop: 5, marginBottom: 10, }}>
                <MainText title={profile?.name} type='main' />
              </View>
              {qrvalue == null ?
                <>
                  <MainText title='Please Scan QR Code' type='main' numberOfLines={1} />
                </>
                :
                <>

                  {qrvalue ? (
                    <View>
                      <MainText title={"សាខា - BU: " + qrvalue} type='main' numberOfLines={2} />
                      <MainText title={"ថ្ងៃខែចេញ/ចូល: " + currentDate} numberOfLines={2} />
                      <MainText title={"ម៉ោងចេញ/ចូល: " + currentTime} onChangeText={(text) => { setCurrentTime(text) }} />
                      {meter <= project?.size_scan ? (
                        <MainText title={"ចំងាយពី​ទីតាំង: " + meter + `ម៉ែត្រ`} style={{ color: Colors.DEFAULT_SUCCESS }} />
                      ) : (
                        <MainText title={"ចំងាយពី​ទីតាំង: " + meter + `ម៉ែត្រ`} style={{ color: Colors.DEFAULT_RED }} />
                      )}

                    </View>
                  )
                    : <>
                    </>}
                  {qrvalue.includes('https://') ||
                    qrvalue.includes('http://') ||
                    qrvalue.includes('http://') ||
                    qrvalue.includes('@') ||
                    qrvalue.includes('geo:') ? (
                    <TouchableOpacity onPress={onOpenlink}>
                      <MainText style={styles.textLinkStyle}
                        title={
                          qrvalue.includes('geo:') ?
                            'Open in Map' : 'Open Link'
                        }
                      />
                    </TouchableOpacity>
                  ) :
                    <View style={styles.btnChekin}>
                      {message.result == 'wrong' || message.result == '' ?
                        <>
                          <ModalPoup
                            visible={visibleSmall}
                          >
                            <View style={{ alignItems: 'center' }}>
                              <View style={styles.header}>
                                <TouchableOpacity onPress={() => setVisible(false)}>
                                  <Ionicons name="close" size={30} />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                              <Entypo name="circle-with-cross" size={100} color={Colors.DEFAULT_RED} />
                            </View>
                            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                              សូមពិនិត្យ​ មើលសាខា​ឡើងវិញ​!
                            </Text>
                          </ModalPoup>
                        </>
                        : (
                          <>
                            <View style={styles.btnChekin}>
                              {message.result == 'wrong' || message.result == '' ?
                                <>
                                  <ModalPoup visible={visibleSmall}>
                                    <View style={{ alignItems: 'center' }}>
                                      <View style={styles.header}>
                                        <TouchableOpacity onPress={() => setVisible(false)}>
                                          <Ionicons name="close" size={30} />
                                        </TouchableOpacity>
                                      </View>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                      <Entypo name="circle-with-cross" size={100} color={Colors.DEFAULT_RED} />
                                    </View>
                                    <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                                      សូមពិនិត្យ​ មើលសាខា​ឡើងវិញ​!
                                    </Text>
                                  </ModalPoup>
                                </>
                                : (
                                  <>
                                  </>
                                )}
                              {profile?.role_as == 1 ? (
                                <>
                                  {isButtonDisabled === false ?
                                    <Button title={"Check in me"}
                                      type='default'
                                      disabled={isButtonDisabled}
                                      onPress={onSave}
                                      iconRight={<MaterialIcons name="check-circle-outline"
                                        size={15} style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }} />} />
                                    :
                                    <Button title={"Sending...  "} type='danger'
                                      disabled={isButtonDisabled}
                                      iconLeft={
                                        <ActivityIndicator size={20} color={Colors.DEFAULT_WHITE} animating />
                                      }
                                    />
                                  }

                                </>
                              ) : (
                                <>
                                  {meter <= project?.size_scan ? (
                                    <>
                                      {isButtonDisabled === false ?
                                        <Button title={"Check in me"}
                                          type='default'
                                          disabled={isButtonDisabled}
                                          onPress={onSave}
                                          iconRight={<MaterialIcons name="check-circle-outline"
                                            size={15} style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }} />} />
                                        :
                                        <>
                                          <Button
                                            title={"Sending...  "}
                                            type='danger'
                                            disabled={isButtonDisabled}
                                            iconLeft={
                                              <ActivityIndicator size={20} color={Colors.DEFAULT_WHITE} animating />
                                            } />
                                        </>
                                      }
                                    </>
                                  ) : (
                                    <View style={{ width: 210, justifyContent: 'center', alignSelf: 'center' }}>
                                      <MainText title={"អនុញ្ញាត្តិត្រឹមតែ " + project?.size_scan + "ម៉ែត្រ" + "​ ពីសាខារបស់អ្នក!"} type='small' />
                                    </View>
                                  )}
                                </>
                              )}
                            </View>
                          </>
                        )}
                    </View>

                  }
                </>
              }
            </View>
          </>}
      </View>
    );
  }
  const onBarcodeScan = (qrvalue) => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 1000
      },
    );
    // };

    getProject();
    var params = {
      project_name: qrvalue
    }
    setLoading(true);
    request("project_location.php", "POST", params).then(res => {
      setLoading(false);
      if (res) {
        const toRadian = n => (n * Math.PI) / 180;
        let lat2 = res.lan;
        let lon2 = res.lon;

        let lat1 = currentLatitude;
        let lon1 = currentLongitude;
        let R = 6371;  // km
        let x1 = lat2 - lat1;
        let dLat = toRadian(x1)
        let x2 = lon2 - lon1
        let dLon = toRadian(x2)
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
        let c = (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        let d = 0;
        d = (R * c);
        let m = parseInt(d * 1000);
        if (isNaN(m)) {
          //if input is not a number then here
          //alert('It is not a Number');
          setMeter('');
        } else {
          //if input is number then here
          setMeter(m);
        }
      }
    }).catch(err => {
      console.log(err);
    });
    setQrvalue(qrvalue);
    // setOpneScanner(false);
    setCameraPermission();
  };
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        // distanceFilter: 0,
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 1000
      },
    );
  };
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        setLocationStatus('You are Here');
        // console.log(position);

        //getting the Longitude from the location json        
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        // distanceFilter: 0,
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 1000
      },
    );
  };
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const HomeScreenStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home1" component={HomeScreen} />
      <Stack.Screen name="permission" component={PermissionScreen} />
      <Stack.Screen name='longPermission' component={PermissionLong} />
      <Stack.Screen name='shortPermission' component={PermissionShort} />
      <Stack.Screen name='QrcodeByShowroom' component={QrCodeByShowroom}/>
    </Stack.Navigator>
  );
  const QrcodeScreenStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Qrcode" component={QrcodeScreen} /> */}
      <Stack.Screen name="Qrcode" component={""} />
    </Stack.Navigator>
  );
  const ProfileScreenStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile1" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name='Address' component={AddressScreen} />
      <Stack.Screen name='History' component={HistoryByMonth} />
      <Stack.Screen name='PermissionList' component={PermissionList} />
      <Stack.Screen name='EmpInfo' component={EmpInfo} />
      <Stack.Screen name='Permissions' component={Permissions} />
      <Stack.Screen name='Loaderimage' component={LoaderImage} />
      <Stack.Screen name='AllEmployee' component={AllEmployee} />
      <Stack.Screen name='AllAttandances' component={AllAttandances} />
      <Stack.Screen name='AllPermissions' component={AllPermissions} />
      <Stack.Screen name='PersonalInfo' component={PersonalInfo}/>
      <Stack.Screen name='EmpInfoByShowrooms' component={EmpInfoByShowrooms}/>
      <Stack.Screen name='AttByShowrooms' component={AttByShowrooms}/>
      <Stack.Screen name='PermissionByShowrooms' component={PermissionByShowrooms}/>
    </Stack.Navigator>
  );
  const config = {
    screens: {
      អំពីខ្ញុំ: {
        screens: {
          EmpInfo: 'EmpInfo',
        },
      },
    },
  };
  const linking = {
    prefixes: ['com.hrd://'],
    config,
  };
  const SreenComponent = () => {
    return "";
  }
  return (
    <NavigationContainer linking={linking}>
      {profile?.is_login != null ?
        <Tab.Navigator
          screenOptions={({ route, }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'ទំព័រដើម') {
                iconName = focused ? 'home' : 'home-sharp';
              }
              else if (route.name === 'Check in me') {
                iconName = focused ? 'qr-code' : 'qr-code-outline';
              }
              else if (route.name === "អំពីខ្ញុំ") {
                iconName = focused ? 'person-circle-sharp' : 'person-circle-outline'
              }
              return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: '#D86C27',
            tabBarInactiveTintColor: 'black',
          })}
        >
          <Tab.Screen name="ទំព័រដើម" component={HomeScreenStack} />
          <Tab.Screen name="Scan"
            component={SreenComponent}

            options={() => ({
              tabBarLabel: () => null,
              tabBarIcon: () => (
                <View style={{ width: 90, height: 90, marginBottom: 15, alignItems: "center", justifyContent: "center", backgroundColor: 'transparent' }}>
                  <ScreenModal
                    onBackdropPress={() => { setVisible(false), setQrvalue('') }}
                    visible={visible}
                    onPress={() => {
                      if (visible == true) {
                        setVisible(false);
                      } else {
                        setVisible(true),
                          setQrvalue('')
                      }
                    }}

                  >
                    {renderModalScan()}
                  </ScreenModal>

                </View>
              )
            })}

          />
          <Tab.Screen initialRouteName={'ProfileTab'} name='អំពីខ្ញុំ' component={ProfileScreenStack} />
        </Tab.Navigator>
        : <>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name='Singup' component={SignupScreen}/>
          </Stack.Navigator>
        </>
      }
    </NavigationContainer >
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  profileImgContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.DEFAULT_ORANGE,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    minWidth: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: 'blue',
    paddingVertical: 20,
  },
  btnChekin: {
    width: '100%',
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  modalBackGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.DEFAULT_WHITE,
    // paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    // elevation: 20,
    // padding: 15,
  },
  header: {
    width: '100%',
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
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
    height: 90,
    width: 90,
    backgroundColor: Colors.DEFAULT_PRIMARY,
    borderRadius: 100
  }
});
export default App;
