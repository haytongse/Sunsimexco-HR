import React, { useEffect, useRef, useState } from 'react'
import {
    Text, View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    ScrollView,
    Image,
    Modal,
    Animated,
    PermissionsAndroid,
    Alert,
    Platform,
    TouchableHighlight
} from 'react-native'
import Layout from '../component/layout/Layout'
import { CameraScreen } from 'react-native-camera-kit';
import HomeProfile from '../component/home/HomeProfile'
import Attendance_List from '../component/home/Attendance_List';
import Colors from '../component/colors/Colors';
import MainText from '../component/text/MainText';
import Button from '../component/button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Permission_List from '../component/home/Permission_List';
import { request } from '../util/request';
import { useDispatch, useSelector } from "react-redux";
import Images from '../component/images/Images';
import { image_path } from '../util/service';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import FastImage from 'react-native-fast-image';
import { SwipeListView } from 'react-native-swipe-list-view';
import moment from 'moment';
import AwesomeAlert from 'react-native-awesome-alerts';
const HomeScreen = ({ navigation, route }) => {
    const [refresh, setRefresh] = useState('');
    const { profile } = useSelector(state => state.profile);
    const [attendance, setAttendance] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [visible, setVisible] = React.useState(false);
    const [currentLongitude, setCurrentLongitude] = useState('.');
    const [currentLatitude, setCurrentLatitude] = useState('.');
    const [locationStatus, setLocationStatus] = useState('');
    const dispatch = useDispatch();
    const [qrvalue, setQrvalue] = useState(null);
    const [opneScanner, setOpneScanner] = useState(false);
    const [message, setMessage] = useState('')
    const [isModalVisible, setModalVisible] = useState(false);
    const [project, setProject] = useState('');
    const [meter, setMeter] = useState(0);
    const [shift, setShift] = useState('');
    const [date, setDate] = useState('');
    const [mode, setMode] = useState('');
    const [show, setShow] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [dataProject, setDataProject] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [totalPermission, setTotalPermissions] = useState(0);
    const [grandtotal, setGrandTotal] = useState(null);
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const Header_Max_Height = 140;
    const Header_Min_Height = 110;
    const Scroll_Distance = Header_Max_Height - Header_Min_Height;
    const DynamicHeader = ({ value }) => {
        const animatedHeaderHeight = value.interpolate({
            inputRange: [0, Scroll_Distance],
            outputRange: [Header_Max_Height, Header_Min_Height],
            extrapolate: 'clamp',
        });
        const animatedHeaderColor = value.interpolate({
            inputRange: [0, Scroll_Distance],
            outputRange: [Colors.DEFAULT_ORANGE, Colors.DEFAULT_SECONDARY],
            extrapolate: 'clamp'
        });

        return (
            <Animated.View style={[styles.header,
            {
                height: animatedHeaderHeight,
                backgroundColor: animatedHeaderColor,
            }
            ]}>
                <View style={styles.container_pc}>
                    <View style={styles.profile_container}>
                        <TouchableOpacity style={styles.profileImgContainer}>
                            <FastImage source={{
                                uri: image_path + profile?.image,
                                priority: FastImage.priority.normal,
                                cache: FastImage.cacheControl.immutable
                            }}
                                style={styles.profileImg}
                            // resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>
                        <View style={styles.txtProfile}>
                            <MainText title='សួស្តី' type='default' pl={8} style={{ color: Colors.DEFAULT_WHITE }} />
                            <View style={{ flexDirection: 'row', }}>
                                <MainText title={profile?.name} type='main' pl={5} style={{ color: Colors.DEFAULT_WHITE }} />
                                <MainText title={profile?.lon} />
                                <View style={{ width: 20, height: 20, backgroundColor: Colors.DEFAULT_WHITE, borderRadius: 100 }}>
                                    {profile?.emp_status != 0 ? (
                                        <MaterialIcons name='verified' size={20} style={{ color: Colors.DEFAULT_PRIMARY }} />
                                    ) : (
                                        <MaterialIcons name='verified' size={20} style={{ color: Colors.DEFAULT_GRAY }} />
                                    )}
                                </View>
                            </View>
                            <MainText pl={5} title={profile?.phone} type='main' style={{ color: Colors.DEFAULT_WHITE }} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.qrcodeContainer
                    } opacity={0.7} onPress={() => { navigation.navigate("QrcodeByShowroom") }}>
                        <View style={styles.qrcodeBody}>
                            <Ionicons name='qr-code-outline' size={25} color={Colors.DEFAULT_WHITE} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }

    useEffect(() => {
        setIsButtonDisabled(false);
        var date = moment()
            .utc('+05:30')
            .format('DD/MM/yyy');
        setCurrentDate(date);
        // LoadData();
        getProjectHome();
        getAttendance();
        getTotalPermissions();
    }, []);
    const LoadData = () => {
        getAttendance();
    }
    const getAttendance = () => {
        var params = {
            emp_id: profile?.id,
            id: profile?.project_id,
        }
        setLoading(true);
        request("attendance_list.php", "POST", params).then(res => {
            if (res) {
                setLoading(false);
                setAttendance(res);
                setRefresh(res);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    data_permission = [
        {
            title: "ពាក្យសុំច្បាប់",
            route: "permission",
        }
    ];
    const getProjectHome = () => {
        request("getAllProjects.php", "POST", {}).then(res => {
            let TotalSale = res;
            if (res) {
                setDataProject(TotalSale);
                setProject(res);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const data = dataProject.map((item, index) => {
        return {
            project: item.project_name,
            earnings: 100
        };
    });
    const getTotalPermissions = () => {
        var params = {
            employeeid: profile?.name,
        }
        request("get_sum_permissions.php", "POST", params).then(res => {
            if (res) {
                setTotalPermissions(res);
                // console.log(res);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const onPressPermission = (item) => {
        navigation.navigate(item.route);
    }
    const getOneTimeLocation = async () => {
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
    const subscribeLocationLocation = async () => {
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
    const onDeletedAccount = async () => {
        if (showAlert == true) {
            setShowAlert(false);
            // await request("deleted_attandance.php", "POST", param).then(res => {
            //     // if (res) {
            //     //     getProjectHome();
            //     //     getAttendance();
            //     //     getTotalPermissions();
            //     // } else {
            //     //     console.log('Employee Not Found!');
            //     // }
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })

        } else {
            setShowAlert(false);
        }
    }
    return (
        <View>
            <DynamicHeader value={scrollOffsetY} />
            <ScrollView
                // nestedScrollEnabled={true}
                scrollEventThrottle={5}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
                    useNativeDriver: false
                }
                )}
            >
                <Layout loading={loading}>
                    {profile?.role_as == 1 ? (
                        <>
                            <View style={styles.balanceContainer}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                        {totalPermission?.year == null || totalPermission?.year == "" ? (
                                            <MainText title={'ការស្នើច្បាប់ប្រចាំឆ្នាំ : '} type='title' style={{ color: Colors.DEFAULT_ORANGE, fontWeight: 'bold' }} />
                                        ) : (
                                            <MainText title={'ការស្នើច្បាប់ប្រចាំឆ្នាំ : ' + totalPermission?.year} type='title' style={{ color: Colors.DEFAULT_ORANGE, fontWeight: 'bold' }} />
                                        )}
                                    </View>
                                    <View style={styles.cycleContainer}>
                                        <View style={styles.cycleBody}>
                                            <View style={{ alignItems: 'center', }}>
                                                {totalPermission?.total > totalPermission?.annual ? (
                                                    <>
                                                        <MainText title={'ឈប់លើស'} style={{ color: Colors.DEFAULT_RED, marginBottom: -15 }} />
                                                        <MainText title={totalPermission?.grandTotal} style={{ color: Colors.DEFAULT_RED, fontSize: 40, marginBottom: -10, fontWeight: 'bold' }} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <MainText title={'នៅសល់'} style={{ color: Colors.DEFAULT_ORANGE, marginBottom: -15 }} />
                                                        {totalPermission?.grandTotal == null || totalPermission?.grandTotal == "" ? (
                                                            <MainText title={''} style={{ color: Colors.DEFAULT_PRIMARY, fontSize: 40, marginBottom: -10, fontWeight: 'bold' }} />
                                                        ) : (
                                                            <MainText title={totalPermission?.grandTotal} style={{ color: Colors.DEFAULT_PRIMARY, fontSize: 40, marginBottom: -10, fontWeight: 'bold' }} />
                                                        )}
                                                    </>
                                                )}
                                                {totalPermission?.annual == null || totalPermission?.annual == '' ? (
                                                    <MainText title={''} type='default' style={{ color: Colors.DEFAULT_ORANGE, fontSize: 20, }} />
                                                ) : (
                                                    <MainText title={'/' + totalPermission?.annual} type='default' style={{ color: Colors.DEFAULT_ORANGE, fontSize: 20, }} />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.totalContainer}>
                                    <MainText title={'ចំនួនច្បាប់ឈប់សម្រាក'} style={styles.totalText} />
                                    {totalPermission?.total == null || totalPermission.total == '' ? (
                                        <MainText title={'មិនមាន'} style={styles.totalAmtemty} />
                                    ) : (
                                        // <TouchableOpacity onPress={()=>{navigation.navigate("Permissions")}}>
                                            <MainText title={totalPermission?.total} style={styles.totalAmt} />
                                        // </TouchableOpacity>

                                    )}
                                </View>
                            </View>
                            <View>
                                <MainText title='1'/>
                            </View>
                            <View style={styles.attendance_container}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <MainText title="សម្រង់វត្តមាន 2 ថ្ងៃចុងក្រោយ" type="main" style={{ color: Colors.DEFAULT_GRAY, justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View>
                                        <Button iconLeft={<Ionicons name='reload' size={20} color={Colors.DEFAULT_WHITE} />} onPress={LoadData} type='default' />
                                    </View>
                                </View>
                                <View style={{ borderWidth: 0.3, marginTop: 10, marginBottom: 5, borderColor: Colors.DEFAULT_ORANGE }}>
                                </View>
                                <View style={styles.ItemHeaderlist}>
                                    <MainText title="សាខា" style={{ color: Colors.DEFAULT_WHITE }} />
                                    <MainText title="ថ្ងៃខែឆ្នាំ" style={{ color: Colors.DEFAULT_WHITE }} />
                                    <View style={styles.rowScan}>
                                        <MainText title="ម៉ោងចូល/ចេញ" pr={'32%'} style={{ color: Colors.DEFAULT_WHITE }} />
                                    </View>
                                </View>
                                {attendance.result != 'ko' ?
                                    <FlatList
                                        scrollEnabled={false}
                                        data={attendance}
                                        renderItem={({ item, index }) => {
                                            let id = item?.id;
                                            let meter = item.meter_scan;
                                            let allow = parseInt(item.allow_size_scan);
                                            return (
                                                <View key={index}>
                                                    <View style={styles.Itemlist} >
                                                        <MainText title={index + 1 + '.'} />
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                            <MainText title={item.project_name} pl={2} type="s_small" style={{ backgroundColor: Colors.DEFAULT_ORANGE, width: 50, color: Colors.DEFAULT_WHITE, marginBottom: 2 }} />
                                                            <View style={{ width: '100%', height: 0.7, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                                                            <MainText style={styles.rowScanTime_row} title={item.date_scan} type="s_small" />
                                                        </View>
                                                        <View style={styles.rowScanTime}>
                                                            <MainText title={item.time_scan} type="s_small" pr={5} />
                                                            <MainText title={item.state} type="s_small" pr={5} />
                                                            <MainText title={item.useradd} type="s_small" pr={5} />
                                                            {meter > allow ?
                                                                <MainText pr={5} style={styles.strikeThroughtextStyle} title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="s_small" />
                                                                : (
                                                                    <MainText title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="s_small" pr={5} />
                                                                )}
                                                        </View>
                                                        <View style={styles.btnDeleteContainer}>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    setShowAlert(!showAlert);
                                                                    var param = {
                                                                        id: item?.id
                                                                    }
                                                                    request("deleted_attandance.php", "POST", param)
                                                                        .then(res => {
                                                                            if (res) {
                                                                                if (showAlert == false) {
                                                                                    setTimeout(() => {
                                                                                        getAttendance();
                                                                                        setShowAlert(false);
                                                                                    }, 2000)

                                                                                } else {
                                                                                    setShowAlert(true);
                                                                                }
                                                                            } else {
                                                                                console.log('Data Not Found!');
                                                                            }
                                                                        })
                                                                        .catch(err => {
                                                                            console.log(err);
                                                                        })
                                                                }}
                                                                style={styles.btnDelete}
                                                            >
                                                                <Ionicons name='trash' size={16} color={Colors.DEFAULT_WHITE} />
                                                            </TouchableOpacity>
                                                            <AwesomeAlert
                                                                show={showAlert}
                                                                title={`Delete Attandance `}
                                                                titleStyle={{ fontSize: 25, color: 'red', fontWeight: 'bold' }}
                                                                message='Your Attandance has been deleted.'
                                                                messageStyle={{ fontSize: 14, color: 'black' }}
                                                                cancelButtonStyle={{ backgroundColor: Colors.DEFAULT_RED, width: 80, alignItems: 'center' }}
                                                                cancelButtonTextStyle={{ fontSize: 16 }}
                                                                onCancelPressed={() => {
                                                                    setShowAlert(false);
                                                                }}
                                                                closeOnTouchOutside={true}
                                                                closeOnHardwareBackPress={true}
                                                            />
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '100%', height: 0.7, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                                                </View>

                                            );
                                        }}
                                    />

                                    : (
                                        <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Image source={Images.LOGO} resizeMode='contain' style={{ width: 200, height: 200, opacity: 0.1 }} />
                                            <MainText style={{ color: Colors.DEFAULT_RED }} title='មិនមានទិន្នន័យ!' type='title' />
                                        </View>
                                    )}
                            </View>
                        </>
                    )
                        :
                        <>
                            <View style={styles.balanceContainer}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                        {totalPermission?.year == null || totalPermission?.year == "" ? (
                                            <MainText title={'ការស្នើច្បាប់ប្រចាំឆ្នាំ : '} type='title' style={{ color: Colors.DEFAULT_ORANGE, fontWeight: 'bold' }} />
                                        ) : (
                                            <MainText title={'ការស្នើច្បាប់ប្រចាំឆ្នាំ : ' + totalPermission?.year} type='title' style={{ color: Colors.DEFAULT_ORANGE, fontWeight: 'bold' }} />
                                        )}
                                    </View>
                                    <View style={styles.cycleContainer}>
                                        <View style={styles.cycleBody}>
                                            <View style={{ alignItems: 'center', }}>
                                                {totalPermission?.total > totalPermission?.annual ? (
                                                    <>
                                                        <MainText title={'ឈប់លើស'} style={{ color: Colors.DEFAULT_RED, marginBottom: -15 }} />
                                                        <MainText title={totalPermission?.grandTotal} style={{ color: Colors.DEFAULT_RED, fontSize: 40, marginBottom: -10, fontWeight: 'bold' }} />
                                                    </>
                                                ) : (
                                                    <>
                                                        {totalPermission?.grandTotal == null || totalPermission?.grandTotal == '' ? (
                                                            <MainText title={''} style={{ color: Colors.DEFAULT_ORANGE, marginBottom: -15 }} />
                                                        ) : (
                                                            <>
                                                                <MainText title={'នៅសល់'} style={{ color: Colors.DEFAULT_ORANGE, marginBottom: -15 }} />
                                                                <MainText title={totalPermission?.grandTotal} style={{ color: Colors.DEFAULT_PRIMARY, fontSize: 40, marginBottom: -10, fontWeight: 'bold' }} />
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                {totalPermission?.annual == null || totalPermission?.annual == '' ? (
                                                    <MainText title={''} type='default' style={{ color: Colors.DEFAULT_ORANGE, fontSize: 20, }} />
                                                ) : (
                                                    <MainText title={'/' + totalPermission?.annual} type='default' style={{ color: Colors.DEFAULT_ORANGE, fontSize: 20, }} />
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.totalContainer}>
                                    <MainText title={'ចំនួនច្បាប់ឈប់សម្រាក'} type='main' style={styles.totalText} />
                                    {totalPermission?.total == null || totalPermission.total == '' ? (
                                        <MainText title={'មិនមាន'} style={styles.totalAmtemty} />
                                    ) : (
                                        // <TouchableOpacity style={{ backgroundColor: Colors.DEFAULT_ORANGE }}>
                                            <MainText title={totalPermission?.total} style={styles.totalAmt} />
                                        // </TouchableOpacity>
                                    )}

                                </View>
                            </View>
                            <View style={styles.attendance_container}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <MainText title="សម្រង់វត្តមាន 2 ថ្ងៃចុងក្រោយ" type="main" style={{ color: Colors.DEFAULT_GRAY, justifyContent: 'center', alignSelf: 'center' }} />
                                    </View>
                                    <View>
                                        <Button iconLeft={<Ionicons name='reload' size={20} color={Colors.DEFAULT_WHITE} />} onPress={LoadData} type='default' />
                                    </View>
                                </View>
                                <View style={{ borderWidth: 0.3, marginTop: 10, marginBottom: 5, borderColor: Colors.DEFAULT_ORANGE }}>
                                </View>
                                <View style={styles.ItemHeaderlist}>
                                    <MainText title="សាខា" style={{ color: Colors.DEFAULT_WHITE }} />
                                    <MainText title="ថ្ងៃខែឆ្នាំ" style={{ color: Colors.DEFAULT_WHITE }} />
                                    <View style={styles.rowScan}>
                                        <MainText title="ម៉ោងចូល/ចេញ" pr={'32%'} style={{ color: Colors.DEFAULT_WHITE }} />
                                    </View>
                                </View>
                                {attendance.result != 'ko' ?
                                    <FlatList
                                        scrollEnabled={false}
                                        data={attendance}
                                        renderItem={({ item, index }) => {
                                            let meter = item.meter_scan;
                                            let allow = parseInt(item.allow_size_scan);
                                            return (
                                                <View key={index}>
                                                    <View style={styles.Itemlist} >
                                                        <MainText title={index + 1 + '.'} />
                                                        {/* <MainText title={item.project_name} pl={2} type="s_small" style={{ backgroundColor: Colors.DEFAULT_ORANGE, width: 50, color: Colors.DEFAULT_WHITE }} /> */}
                                                        <MainText style={styles.rowScanTime_row} title={item.date_scan} type="s_small" />
                                                        <View style={styles.rowScanTime}>
                                                            <MainText title={item.time_scan} type="s_small" pr={5} />
                                                            <MainText title={item.state} type="s_small" pr={5} />
                                                            <MainText title={item.useradd} type="s_small" pr={5} />
                                                            {meter > allow ?
                                                                <MainText pr={5} style={styles.strikeThroughtextStyle} title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="s_small" />
                                                                : (
                                                                    <MainText title={'ចំងាយ ' + meter + ' ម៉ែត្រ'} type="s_small" pr={5} />
                                                                )}
                                                        </View>

                                                    </View>
                                                    <View style={{ width: '100%', height: 0.7, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                                                </View>
                                            );
                                        }}
                                    />

                                    : (
                                        <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                                            <Image source={Images.LOGO} resizeMode='contain' style={{ width: 200, height: 200, opacity: 0.1 }} />
                                            <MainText style={{ color: Colors.DEFAULT_RED }} title='មិនមានទិន្នន័យ!' type='title' />
                                        </View>
                                    )}
                            </View>
                        </>
                    }
                    <View style={{ height: 400 }}></View>
                </Layout>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 50
    },
    attendance_container: {
        width: '100%',
        // height: '100%',
        borderWidth: 1,
        borderColor: Colors.DEFAULT_ORANGE,
        borderRadius: 10,
        backgroundColor: Colors.DEFAULT_GREY,
        padding: 10,
        // position: 'relative'
    },
    ItemHeaderlist: {
        flexDirection: "row",
        // marginTop: 15,
        backgroundColor: Colors.DEFAULT_ORANGE,
        padding: 5,
        justifyContent: "space-between",
        // alignItems: "center",
        // overflow: "hidden"
    },
    Itemlist: {
        width: '95%',
        height: 40,
        flexDirection: "row",
        backgroundColor: Colors.DEFAULT_GREY,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowScan: {
        // width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 5,
    },
    btnText: {
        width: 50,
        fontSize: 10,
    },
    verticalLine: {
        backgroundColor: Colors.DEFAULT_ORANGE,
        width: 0.5,
        padding: 0
    },
    rowScanTime: {
        width: '70%',
        flexDirection: "row",
    },
    rowScanTime_row: {
        // width: 400,
        justifyContent: "space-between",

    },
    strikeThroughtextStyle: {
        textDecorationLine: 'line-through',
        color: Colors.DEFAULT_RED
        //line-through is the trick
    },
    container_pc: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    profile_container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
    },
    profileImgContainer: {
        width: 80,
        height: 80,
        overflow: 'hidden'
    },
    profileImg: {
        width: 70,
        height: 70,
        borderWidth: 3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.DEFAULT_WHITE,
    },
    txtProfile: {
        marginBottom: 2,
        justifyContent: 'center',
    },
    notification: {
        marginTop: 10,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        elevation: 20,
        padding: 15,
    },
    header: {
        // width: '100%',
        // height: 30,
        // alignItems: 'flex-end',
        // justifyContent: 'center',
        // marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
    },
    pieConatainer: {
        flex: 1,
        marginLeft: -20,
    },
    balanceContainer: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderColor: Colors.DEFAULT_ORANGE,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    cycleContainer: {
        width: 120,
        height: 120,
        backgroundColor: Colors.DEFAULT_ORANGE,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderColor: Colors.DEFAULT_RED,
        borderWidth: 3
    },
    cycleBody: {
        width: 90,
        height: 90,
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 45,
        justifyContent: 'center',
    },
    totalContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.DEFAULT_ORANGE,
        marginRight: 10,
    },
    totalAmt: {
        fontSize: 70,
        fontWeight: 'bold',
        color: Colors.DEFAULT_RED
    },
    totalAmtemty: {
        fontSize: 20,
        color: Colors.DEFAULT_ORANGE
    },
    title: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    card: {
        height: 100,
        backgroundColor: '#E6DDC4',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    subtitle: {
        color: '#181D31',
        fontWeight: 'bold',
    },
    qrcodeContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginRight: -10,
    },
    qrcodeBody: {
        width: '70%',
        height: '70%',
        // padding: 3,
        // backgroundColor: Colors.DEFAULT_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.DEFAULT_WHITE,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
    },
    btnDeleteContainer: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDelete: {
        width: 30,
        height: 30,
        backgroundColor: Colors.DEFAULT_RED,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

    }
});
export default HomeScreen;
