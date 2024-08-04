import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Alert,
  Platform,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import Layout from '../component/layout/Layout';
import MainText from '../component/text/MainText';
import Button from '../component/button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalContain from '../component/modal/ModalContain';
import { CameraScreen } from 'react-native-camera-kit';
import Images from '../component/images/Images';
import Colors from '../component/colors/Colors';
import moment from 'moment';
import { request } from '../util/request';
import { useDispatch, useSelector } from 'react-redux';
import AwesomeAlert from "react-native-awesome-alerts";
import Geolocation from '@react-native-community/geolocation';
import { image_path } from '../util/service';

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};
const QrcodeScreen = ({ navigation, route }) => {

  //get Geolocaiton
  const [currentLongitude, setCurrentLongitude] = useState('.');
  const [currentLatitude, setCurrentLatitude] = useState('.');
  const [locationStatus, setLocationStatus] = useState('');
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { profile } = useSelector(state => state.profile);
  const [qrvalue, setQrvalue] = useState(null);
  const [opneScanner, setOpneScanner] = useState(false);
  const [message, setMessage] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState('');
  const [meter, setMeter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shift, setShift] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  //var id = profile.id;
  //Date Time Picker
  const [date, setDate] = useState('');
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    getProject();
    getShifts();
    var date = moment()
      .utc('+05:30')
      .format('DD/MM/yyy');
    var time = moment()
      .utc('+05:30')
      .format('HH:mm:ss a');

    setCurrentDate(date);
    setCurrentTime(time);

    // const requestLocationPermission = async () => {
    //   if (Platform.OS === 'android') {
    //     getOneTimeLocation();
    //     subscribeLocationLocation();
    //   }else if(Platform.OS === 'ios'){
    //     getOneTimeLocation();
    //     subscribeLocationLocation();
    //   } else {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Location Access Required',
    //           message: 'This App needs to Access your location',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         //To Check, If Permission is granted
    //         getOneTimeLocation();
    //         subscribeLocationLocation();
    //       } else {
    //         setLocationStatus('Permission Denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   }
    // };
    // requestLocationPermission();
    // return () => {
    //   Geolocation.clearWatch(watchID);
    // };
  }, []);
  const getProject = () => {
    var params = {
      id: profile?.project_id,
    }
    setLoading(true);
    request("get_project.php", "POST", params).then(res => {
      setLoading(false);
      if (res) {
        setProject(res);
        // console.log(res);
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
      console.log(res);
      setLoading(false);
      if (res) {
        setShift(res);
        // console.log(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };
  const onBarcodeScan = (qrvalue) => {
    var params = {
      project_name: qrvalue
    }
    setLoading(true);
    request("project_location.php", "POST", params).then(res => {
      setLoading(false);
      if (res) {
        // setPro_location(res);
        // console.log(res);
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
    //clearForm();
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    setOpneScanner(false);
  };

  const onOpneScanner = () => {
    getProject();
    getShifts();
    // meterScan();
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs permission for camera access',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setOpneScanner(true);
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      //setQrvalue('');
      setOpneScanner(true);
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
    // alert(emp_shift_id);
    if (project?.id != 1) {
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
              request("save_attendance.php", "POST", params).then(res => {
                setLoading(false);
                if (res) {
                  // console.log(res);
                  setMessage(res);
                  setVisible(true);
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
              request("save_attendance.php", "POST", params).then(res => {
                setLoading(false);
                if (res) {
                  setMessage(res);
                  setVisible(true);
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
            request("save_attendance.php", "POST", params).then(res => {
              setLoading(false);
              if (res) {
                setMessage(res);
                setVisible(true);
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
              request("save_attendance.php", "POST", params).then(res => {
                setLoading(false);
                if (res) {
                  setMessage(res);
                  setVisible(true);
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
      request("save_attendance.php", "POST", params).then(res => {
        setLoading(false);
        if (res) {
          setMessage(res);
          setVisible(true);
        }
      }).catch(err => {
        console.log(err);
      });
    }

  }
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
        enableHighAccuracy: false,
        timeout: 30000,
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
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  return (
    <>
      <Layout loading={loading}>
        {opneScanner ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ height: '80%', borderRadius: 10, }}>
              <CameraScreen
                showFrame={true}
                // Show/hide scan frame
                scanBarcode={true}
                // Can restrict for the QR Code only
                laserColor={Colors.DEFAULT_ORANGE}
                // Color can be of your choice
                frameColor={Colors.DEFAULT_ORANGE}
                // If frame is visible then frame color
                colorForScannerFrame={'black'}
                // Scanner Frame color
                onReadCode={(event) => onBarcodeScan(event.nativeEvent.codeStringValue)
                }
              />
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <MainText title={'ស្គែន​ វត្តមាន'} type='main_title' />
            <TouchableOpacity style={styles.profileImgContainer}>
              <View>
                <Image source={{ uri: `${image_path + profile?.image}` }} style={styles.profileImg} />
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 5, marginBottom: 10, }}>
              <MainText title={profile?.name} type='main' />
            </View>
            {qrvalue === null || qrvalue === '' ?
              <>
                <MainText title='Please Scan QR Code' type='main' numberOfLines={1} />
              </>
              :
              <>
                {qrvalue ? (
                  <View>
                    <MainText title={"សាខា: " + qrvalue} type='main' numberOfLines={2} />
                    <MainText title={"ថ្ងៃខែស្គែន: " + currentDate} numberOfLines={2} />
                    <MainText title={"ម៉ោងស្គែន: " + currentTime} onChangeText={(text) => { setCurrentTime(text) }} />
                    {meter <= project?.size_scan ? (
                      <MainText title={"ចំងាយពី​ទីតាំង: " + meter + `ម៉ែត្រ`} style={{ color: Colors.DEFAULT_SUCCESS }} />
                    ) : (
                      <MainText title={"ចំងាយពី​ទីតាំង: " + meter + `ម៉ែត្រ`} style={{ color: Colors.DEFAULT_RED }} />
                    )}

                  </View>
                )
                  : <></>}
                {/* </Text> */}
                {qrvalue.includes('https://') ||
                  qrvalue.includes('http://') ||
                  qrvalue.includes('geo:') ? (
                  <TouchableHighlight onPress={onOpenlink}>
                    <MainText style={styles.textLinkStyle}
                      title={
                        qrvalue.includes('geo:') ?
                          'Open in Map' : 'Open Link'
                      }
                    />
                  </TouchableHighlight>
                ) :
                  <View style={styles.btnChekin}>
                    {message.result == 'wrong' || message.result == '' ?
                      <>
                        <ModalPoup visible={visible}>
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
                          <ModalPoup visible={visible}>
                            <View style={{ alignItems: 'center' }}>
                              <View style={styles.header}>
                                <TouchableOpacity onPress={() => { navigation.navigate('Home', setQrvalue('')), setVisible(false) }}>
                                  <Ionicons name="close" size={30} />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                              <MaterialIcons name="verified-user" size={100} color={Colors.DEFAULT_SUCCESS} />
                            </View>
                            <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
                              ស្គែន​សម្រង់វត្តមាន​ បានជោគជ័យ
                            </Text>
                          </ModalPoup>
                        </>
                      )}
                    {project?.role_as == 1 ? (
                      <>
                        <Button title={"Check in me"} type='default'
                          onPress={onSave}
                          iconRight={<MaterialIcons name="check-circle-outline"
                            size={15} style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }} />} />
                      </>
                    ) : (
                      <>
                        {meter <= project?.size_scan ? (
                          <Button title={"Check in me"} type='default'
                            onPress={onSave}
                            iconRight={<MaterialIcons name="check-circle-outline"
                              size={15} style={{ marginLeft: 5, color: Colors.DEFAULT_WHITE }} />} />
                        ) : (
                          <View style={{ width: 210 }}>
                            <MainText title={"អនុញ្ញាត្តិត្រឹមតែ " + project?.size_scan + "ម៉ែត្រ" + "​ ពីសាខារបស់អ្នក!"} type='small' />
                          </View>
                        )}
                      </>
                    )}
                  </View>

                }
              </>
            }
          </View>
        )}
      </Layout>
      <View style={{ padding: 10, marginBottom: 50 }}>
        {/* {project?.size_scan >= meter ? ( */}
        <Button
          onPress={onOpneScanner}
          type='title'
          // title={"Scan"}
          size='b_lg'
          iconRight={<MaterialIcons name="qr-code-scanner" size={40} style={{ marginRight: 10, color: Colors.DEFAULT_WHITE }} />}
        />
        {/* ) : null} */}

      </View>
    </>
  );
}
export default QrcodeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    alignItems: 'center',
    // justifyContent: 'center'
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
    width: '50%',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    // width: '៥0%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  image: {
    height: '30%',
    alignSelf: 'center',
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
});