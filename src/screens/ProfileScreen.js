import React, { useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainText from '../component/text/MainText';
import Loading from '../component/loading/Loading';
import Layout from '../component/layout/Layout';
import { logOut } from '../redux/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { image_path } from '../util/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../component/colors/Colors';
import FastImage from 'react-native-fast-image';
import Button from '../component/button/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { request } from '../util/request';
const data_profile = [
    {
        icon: "edit",
        title: "វត្តមានរបស់ខ្ញុំប្រចាំខែ",
        route: "History",
    },
    {
        icon: "hourglass",
        title: "ច្បាប់របស់ខ្ញុំប្រចាំខែ",
        route: "Permissions",
    },
    {
        icon: "user",
        title: "ពត៌មានផ្ទាល់ខ្លួន",
        route: "EmpInfo"
    },
    {
        icon: "home",
        title: "អាស័យដ្ឋាន",
        route: "Address",
    }
];
const data_emp_info_admin = [
    {
        icon: "addusergroup",
        title: "ពត៌មានបុគ្គលិកទាំងអស់",
        route: "AllEmployee"
    },
    {
        icon: "book",
        title: "វត្តបុគ្គលិកទាំងអស់",
        route: "AllAttandances"
    },
    {
        icon: "calculator",
        title: "ច្បាប់បុគ្គលិកទាំងអស់",
        route: "AllPermissions"
    }
];
const data_emp_info_manager = [
    {
        icon: "addusergroup",
        title: "ពត៌មានបុគ្គលិកតាមសាខា",
        route: "EmpInfoByShowrooms"
    },
    {
        icon: "book",
        title: "វត្តបុគ្គលិកតាមសាខា",
        route: "AttByShowrooms"
    }, {
        icon: "calculator",
        title: "ច្បាប់បុគ្គលិកតាមសាខា",
        route: "PermissionByShowrooms"
    }
];
const data_setting = [
    // {
    //     title: "Theme",
    //     route: "Theme"
    // },
    {
        title: "ចាកចេញ",
        route: "Logout"
    }
];
const ProfileScreen = ({ navigation }) => {
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.profile);
    const onPressProfile = (item) => {
        navigation.navigate(item.route);
    }
    const onPressSetting = async (item) => {
        if (item.route == "Logout") {
            dispatch(logOut());
        }
    }
    const onDeletedAccount = async () => {
        if(showAlert == true){
            var param = {
                id: profile?.id
            }
            await request("deleted_account.php","POST", param).then(res =>{
                if(res){
                    dispatch(logOut());
                }else{
                    console.log('Employee Not Found!');
                }
            }).catch(err =>{
                console.log(err);
            })
            
        }else{
            setShowAlert(false);
        }
    }
    const onPressAllEmp = (item) => {
        navigation.navigate(item.route);
    }
    return (
        <Layout>
            <ScrollView>
                <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ height: 100, width: 100, backgroundColor: '#eee', borderWidth: 3, borderColor: '#D86C27', borderRadius: 100, overflow: 'hidden' }}>
                        <FastImage source={{
                            uri: image_path + profile?.image,
                            priority: FastImage.priority.normal
                        }}
                            style={{ width: 100, height: 100 }}
                        />
                    </TouchableOpacity>
                    <MainText title={profile?.name} type='default' />
                    <MainText title={profile?.phone} type='default' />
                </View>
                {profile?.role_as == 1 ? (
                    <>
                        <MainText type='title' title='ពត៌មានបុគ្គលិក' />
                        {data_emp_info_admin?.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.rowItem}
                                    onPress={() => { onPressAllEmp(item) }}
                                >
                                    <View style={styles.rowIcon}>
                                        <AntDesign name={item.icon} size={16} color={Colors.DEFAULT_ORANGE} />
                                        <MainText title={item.title} pl={10} />
                                    </View>
                                    <Entypo name="chevron-small-right" size={24} />
                                </TouchableOpacity>
                            );
                        })}
                        <MainText type='title' title='ពត៌មានផ្ទាល់ខ្លួន' style={{ marginBottom: 10, marginTop: 15 }} />
                        {data_profile?.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => { onPressProfile(item) }}
                                    key={index} style={styles.rowItem}>
                                    <View style={styles.rowIcon}>
                                        <AntDesign name={item.icon} size={16} color={Colors.DEFAULT_ORANGE} />
                                        <MainText title={item.title} pl={10} />
                                    </View>
                                    <Entypo name="chevron-small-right" size={24} />
                                </TouchableOpacity>

                            );
                        })}
                    </>
                ) :
                    <>
                        {profile?.role_as == 2 ? (
                            <>
                                <MainText type='title' title={'ពត៌មានបុគ្គលិកតាមសាខា: ' + profile?.project_name} />
                                {data_emp_info_manager?.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={styles.rowItem}
                                            onPress={() => { onPressAllEmp(item) }}
                                        >
                                            <View style={styles.rowIcon}>
                                                <AntDesign name={item.icon} size={16} color={Colors.DEFAULT_ORANGE} />
                                                <MainText title={item.title} pl={10} />
                                            </View>
                                            <Entypo name="chevron-small-right" size={24} />
                                        </TouchableOpacity>
                                    );
                                })}
                                <MainText type='title' title='ពត៌មានផ្ទាល់ខ្លួន' style={{ marginBottom: 10, marginTop: 15 }} />
                                {data_profile?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { onPressProfile(item) }}
                                            key={index} style={styles.rowItem}>
                                            <View style={styles.rowIcon}>
                                                <AntDesign name={item.icon} size={16} color={Colors.DEFAULT_ORANGE} />
                                                <MainText title={item.title} pl={10} />
                                            </View>
                                            <Entypo name="chevron-small-right" size={24} />
                                        </TouchableOpacity>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                <MainText type='title' title='ពត៌មានផ្ទាល់ខ្លួន' style={{ marginBottom: 10, marginTop: 15 }} />
                                {data_profile?.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { onPressProfile(item) }}
                                            key={index} style={styles.rowItem}>
                                            <View style={styles.rowIcon}>
                                                <AntDesign name={item.icon} size={16} color={Colors.DEFAULT_ORANGE} />
                                                <MainText title={item.title} pl={10} />
                                            </View>
                                            <Entypo name="chevron-small-right" size={24} />
                                        </TouchableOpacity>

                                    );
                                })}
                            </>
                        )}
                    </>
                }

                <MainText title={"ជំនាន់ទី " + '1.0.23'} type='s_small' style={{ color: Colors.DEFAULT_GRAY }} pt={10} />
                {data_setting?.map((item, index) => {
                    return (
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => { onPressSetting(item) }} key={index}
                            style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 10 }}
                        >
                            <View style={styles.rowIcon}>
                                <AntDesign name="logout" size={30} color={Colors.DEFAULT_RED} />
                                <MainText title={item.title} pl={10} type='title' />
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <View style={styles.btnDelete}>
                    {/* <Button title={'លុបគណនី'} onPress={()=> {onDeletedAccount()} }
                        type='danger' size='lg'
                        iconLeft={<AntDesign name='delete' size={25} color={Colors.DEFAULT_WHITE} style={{ marginRight: 5 }} />} /> */}
                    <TouchableOpacity
                        style={styles.btnDeleteBody}
                        onPress={() => setShowAlert(!showAlert)}>
                        <View style={styles.rowIcon}>
                            <AntDesign name="delete" size={25} color={Colors.DEFAULT_WHITE} />
                            <MainText title={'លុបគណនី'} pl={10} type='title' style={styles.btnDeleteTxt} />

                        </View>

                    </TouchableOpacity>
                    <AwesomeAlert
                        show={showAlert}
                        title='Delete Account'
                        titleStyle={{fontSize: 28, color: 'red', fontWeight: 'bold'}}
                        message='Are you sure delete account?' 
                        messageStyle={{fontSize: 14, color: 'black'}}
                        showCancelButton={true}
                        cancelText='No'
                        cancelButtonStyle={{backgroundColor: Colors.DEFAULT_RED, width: 80, alignItems: 'center'}}
                        cancelButtonTextStyle={{fontSize: 16}}
                        onCancelPressed={()=> {
                            setShowAlert(false);
                        }}

                        showConfirmButton={true}
                        confirmText='Yes'
                        confirmButtonStyle={{backgroundColor: Colors.DEFAULT_PRIMARY, width: 85, alignItems: 'center'}}
                        confirmButtonTextStyle={{fontSize: 16}}
                        // showProgress={true}
                        // progressSize={40}
                        // progressColor={Colors.DEFAULT_RED}
                        onConfirmPressed={()=>{
                            onDeletedAccount()
                        }}
                    
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={true}
                        />
                </View>
                <View style={{height: 200}}></View>
            </ScrollView>
            
        </Layout>
    )
}
const styles = StyleSheet.create({
    rowItem: {
        paddingVertical: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: '#D86C27',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowIcon: {
        flexDirection: 'row',
    },
    btnDelete: {
        width: '100%',
        marginTop: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    btnDeleteBody: {
        backgroundColor: Colors.DEFAULT_RED,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    btnDeleteTxt: {
        color: Colors.DEFAULT_WHITE,
        
    }
})
export default ProfileScreen;
