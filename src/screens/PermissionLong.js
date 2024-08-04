import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, ScrollView, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import Layout from '../component/layout/Layout';
import MainText from '../component/text/MainText';
import Button from '../component/button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../component/colors/Colors';
import ComposePicker from '../component/datePicker/ComposePicker';
import Images from '../component/images/Images';
import { image_path } from '../util/service';
import { useSelector } from 'react-redux';
import InputText from '../component/input/InputText';
import { SelectList } from 'react-native-dropdown-select-list';
import { request } from '../util/request';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from 'moment';
import { requestUserPermission, notificatioinListner, getToken, onDisplayNotification } from "../util/pushnotification_helper";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import DateTimePicker from '@react-native-community/datetimepicker';

const PermissionLong = ({ navigation }) => {
  const [currentLongitude, setCurrentLongitude] = useState('.');
  const [currentLatitude, setCurrentLatitude] = useState('.');
  const [locationStatus, setLocationStatus] = useState('');
  const [project, setProject] = useState('');
  const [meter, setMeter] = useState(0);

  const [token, setToken] = useState('');
  useEffect(() => {
    getPermissionType();
    getProject();
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
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
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const { profile } = useSelector(state => state.profile);
  const [selected, setSelected] = useState("");
  const [dataPer, setDataPer] = useState("");
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(new Date().toLocaleString('en-US'));
  const [endDate, setEndDate] = useState("");
  const [reson, setReson] = useState("");

  const data = [
    { key: '1', value: 'Annual' },
    { key: '2', value: 'Marriage' },
    { key: '3', value: 'Matemity' },
    { key: '4', value: 'Patemity' },
  ];
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
  const getPermissionType = () => {
    setLoading(true);
    request("get_permissiontype.php", "POST", {}).then(res => {
      // clearForm();
      setLoading(false);
      if (res) {
        setDataPer(res)
        // console.log(res);
      }
    }).catch(err => {
      console.log(err);
    })
  }
  const [date, setDate] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setStartDate(currentDate);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDateEnd(currentDate);
    setEndDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  const showTimepicker = () => {
    showMode('time');
  };
  const savePermission = () => {
    if (selected === '' || selected === null) {
      Alert.alert('ស្នើច្បាប់​ តាមលក្ខណ៍', 'សូម​ Select ប្រភេទច្បាប់!', [
        { text: "Cancel", }
      ]);
    } else if (startDate === '' || startDate === null) {
      Alert.alert('ស្នើច្បាប់​ តាមលក្ខណ៍', 'សូម​ Select ថ្ងៃចាប់ផ្តើម!', [
        { text: "Cancel", }
      ]);
    } else if (endDate === '' || endDate === null) {
      Alert.alert('ស្នើច្បាប់​ តាមលក្ខណ៍', 'សូម​ Select ថ្ងៃបញ្ចប់!', [
        { text: "Cancel", }
      ]);
    } else {
      const toRadian = n => (n * Math.PI) / 180;
      let lat2 = project.lan;
      let lon2 = project.lon;
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
      if (meter != 0) {
        var params = {
          project_name: project.project_name,
          employeeid: profile.id,
          permission_type: 'PL',
          leave_type: selected,
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0],
          status: 'P',
          reson: reson,
          emp_meter: meter,
          useradd: profile.name,
        }
        // setLoading(true);
        // request("save_permission.php", "POST", params).then(res => {
        //   setLoading(false);
        //   if (res) {
        request("get_employee.php", "POST", {}).then(res => {
          if (res) {
            console.log(res);
            if (profile.role_as == 0) {
              onDisplayNotification({
                title: `ស្នើសុំច្បាប់`,
                body: profile?.name,
              })
            }
          }
        })
        //   }
        // }).catch(err => {
        //   console.log(err);
        // });
      }
      // else {
      //   Alert.alert('ស្នើច្បាប់​ តាមលក្ខណ៍', 'សូម​ ពិនិត្យ Showroom ឡើងវិញ!', [
      //     { text: "Cancel", }
      //   ]);
      // }
    }
  }
  return (
    <Layout loading={loading}>
      <View style={styles.headerContainer}>
        <Ionicons name="chevron-back-outline" size={25}
          color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
          onPress={() => navigation.goBack()}
        />
        <MainText title='ស្នើសុំច្បាប់​ តាមលក្ខណ៍' type='default' />
      </View>
      <KeyboardAwareScrollView
        // style={{flex: 1, width: '100%'}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.txtMainContainer}>
          <TouchableOpacity style={styles.profileImgContainer}>
            <View>
              <Image source={{ uri: `${image_path + profile?.image}` }} style={styles.profileImg} />
            </View>
          </TouchableOpacity>
          <MainText title='ស្នើច្បាប់' style={styles.txtMain} />
        </View>
        <View style={styles.txtSubContainer}>
          <View style={styles.txtSub}>
            <View style={{ marginTop: 10 }}>
              <MainText title='ប្រ/ច្បាប់' type='default' />
            </View>
            <View style={{ width: '90%' }}>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                value='value'
                placeholder='Please select...'
                color={Colors.DEFAULT_GREY}
                borderWidth={1}
                borderColor='red'
              />
            </View>
          </View>
          <View style={styles.txtSub}>
            {/* <View style={{ justifyContent: 'center', }}>
              <MainText title='ចាប់ផ្តើម' type='default' pr={5} />
            </View> */}
            {/* <ComposePicker
              style={{ width: '90%', alignSelf: 'flex-end' }}
              customStyles={{
                placeholderText: { fontSize: 12 }, // placeHolder style
                headerStyle: {},			// title container style
                headerMarkTitle: {}, // title mark style 
                headerDateTitle: {}, // title Date style
                contentInput: {}, //content text container style
                contentText: {}, //after selected text Style
              }} // optional
              // centerAlign // optional text will align center or not
              // allowFontScaling={false} // optional
              placeholder={'ចាប់ផ្តើម ​'}
            /> */}
            {/* <View style={{ width: '90%' }}>
              <DateTimePicker

                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
              />
            </View> */}

          </View>
          {/* <View style={styles.txtSub}>
            <View style={{ justifyContent: 'center', }}>
              <MainText title='បញ្ចប់' type='default' pr={10} />
            </View>
            <View style={{ width: '90%', alignSelf: 'flex-end', }}>
              <ComposePicker
                customStyles={{
                  placeholderText: { fontSize: 12 }, // placeHolder style
                  headerStyle: {},			// title container style
                  headerMarkTitle: {}, // title mark style 
                  headerDateTitle: {}, // title Date style
                  contentInput: {}, //content text container style
                  contentText: {}, //after selected text Style
                }} // optional
                // centerAlign // optional text will align center or not
                // allowFontScaling={false} // optional
                placeholder={'បញ្ចប់ ​'}
                setSelected={(val) => setEndDate(val)}
              />
            </View>
          </View> */}
          <View style={styles.DateContainer}>
            <View style={styles.Date}>
              <MainText title='ចាប់ផ្តើម' type='default' />
              <View style={styles.dateTimePicker}>
                <DateTimePicker
                  testID="showDatepicker"
                  value={date}
                  disabled={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  mode={'date'}
                  is24Hour={false}
                  onChange={onChangeStart}
                  display={'default'}
                />
              </View>
            </View>
            <View style={styles.Date}>
              <MainText title='បញ្ចប់' type='default' pl={5} />
              <View style={styles.dateTimePicker}>
                <DateTimePicker
                  // testID="showDatepicker"
                  // value={date}
                  // mode={mode}
                  // is24Hour={true}
                  // onChange={onChangeEnd}
                  testID='"showDatepicker"'
                  value={dateEnd}
                  disabled={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  mode={'date'}
                  is24Hour={false}
                  onChange={onChangeEnd}
                  display={'default'}
                />
              </View>
            </View>
          </View>
          <View style={styles.resonContainer}>
            <MainText title='មូលហេតុ' type='main' />
            <TextInput style={{
              borderColor: Colors.DEFAULT_BLACK,
              borderWidth: 1,
              borderRadius: 5,
              padding: 10
            }}
              placeholder="បញ្ជាក់មួលហេតុ..."
              onChangeText={(text) => {
                setReson(text)
              }}

            />
          </View>
          <Text style={{ color: Colors.DEFAULT_BLACK }}></Text>
          <View style={{ marginTop: 20 }}>
            <Button title={'ស្នើច្បាប់'}
              type='default'
              onPress={() => savePermission()}

            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Layout>
  )
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  txtMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  txtMain: {
    fontSize: 15,
    color: Colors.DEFAULT_ORANGE,
    fontWeight: 'bold',

  },
  txtSubContainer: {
    flex: 1,
    // padding: 5,
    //  justifyContent: 'center',
    // alignSelf: 'center'
  },
  txtSub: {
    width: '95%',
    flexDirection: 'row',
    // justifyContent: 'center',
    padding: 5,
  },
  profileImgContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  DateContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  Date: {
    flexDirection: 'row',
    alignItems: 'center'
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
  resonContainer: {
    padding: 5,
  },
  dateTimePicker: {
    // backgroundColor: Colors.DEFAULT_BLACK,
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    padding: 0,
  }
});

export default PermissionLong;