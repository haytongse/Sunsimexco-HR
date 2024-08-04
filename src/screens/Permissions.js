import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList, Alert, Modal, Pressable } from 'react-native';
import MainText from '../component/text/MainText';
import Layout from '../component/layout/Layout';
import Colors from '../component/colors/Colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from '../component/button/Button';
import Images from '../component/images/Images';
import { request } from '../util/request';
import ModalContain from '../component/modal/ModalContain';
import FastImage from 'react-native-fast-image';
import { image_path } from '../util/service';
const Permissions = ({ navigation }) => {
    const { profile } = useSelector(state => state.profile);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
    const [selectDate, setSelectDate] = useState('ថ្ងៃចាប់ផ្តើម');
    const [selectDateEnd, setSelectDateEnd] = useState('បញ្ចប់');
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [visible, setVisible] = useState(false);
    const [idImage, setIdImage] = useState(null);
    // useEffect(() => {
    //     searchPermissions();
    // }, []);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showDatePickerEnd = () => {
        setDatePickerVisibilityEnd(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideDatePickerEnd = () => {
        setDatePickerVisibilityEnd(false);
    };
    const handleConfirm = (date) => {
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        setSelectDate(x1[2] + '/' + x1[1] + '/' + x1[0]);
        hideDatePicker();
    };
    const handleConfirmEnd = (date) => {
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        setSelectDateEnd(x1[2] + '/' + x1[1] + '/' + x1[0]);
        hideDatePickerEnd();
    };
    const searchPermissions = async () => {
        if (selectDate == 'ថ្ងៃចាប់ផ្តើម' && selectDateEnd == 'បញ្ចប់') {
            var param = {
                employeeid: profile?.name,
                from_date: selectDate,
                to_date: selectDateEnd
            }
            //api login
            setLoading(true);
            await request("permissions_by_date.php", "POST", param).then(res => {
                setLoading(false);
                if (res) {
                    setPermissions(res);
                    // console.log(res);
                } else {
                    console.log("Date Not Found!");
                }
            }).catch(err => {
                console.log(err);
            });
        } else if (selectDate != 'ថ្ងៃចាប់ផ្តើម' && selectDateEnd != 'បញ្ចប់') {
            var param = {
                employeeid: profile?.name,
                from_date: selectDate,
                to_date: selectDateEnd
            }
            //api login
            setLoading(true);
            await request("permissions_by_date.php", "POST", param).then(res => {
                setLoading(false);
                if (res) {
                    setPermissions(res);
                    console.log(res);
                } else {
                    console.log("Date Not Found!");
                }
            }).catch(err => {
                console.log(err);
            });
        }

    }
    const clearForm = () => {
        setIdImage(null);
    }
    const openForm = () => {
        setVisible(true)
        setIdImage(null);
    }
    const onCloseModal = () => {
        setIdImage("");
        setVisible(false);
        clearForm();
    }
    const ImageLoader = ({ idImage }) => {
        return (
            <View style={{ height: '80%' }}>
                <FastImage source={{
                    uri: image_path + idImage,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable
                }}
                    style={{ width: 400, height: '100%' }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <MainText title={idImage} />
            </View>
        );
    }
    return (
        <Layout loading={loading}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-outline" size={25}
                    color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                    onPress={() => navigation.goBack()}
                />
                <MainText title='ច្បាប់ ប្រចាំខែ' type='default' />
            </View>
            <View style={styles.DateContainer}>
                <View style={{ width: '15%' }}>
                    <MainText title='ចាប់ផ្តើម' type='default' pr={10} />
                </View>
                <TouchableOpacity
                    onPress={() => { showDatePicker() }}
                    style={styles.DateTimetxt}>
                    <Text style={{ fontSize: 16, }}>{selectDate}</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View style={styles.DateContainer}>
                <View style={{ width: '15%' }}>
                    <MainText title='បញ្ចប់' type='default' pr={10} />
                </View>
                <TouchableOpacity
                    onPress={() => { showDatePickerEnd() }}
                    style={styles.DateTimetxt}>
                    <Text style={{ fontSize: 16, }}>{selectDateEnd}</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal isVisible={isDatePickerVisibleEnd}
                mode="date"
                onConfirm={handleConfirmEnd}
                onCancel={hideDatePickerEnd}
            />
            <Button title={"ស្វែងរក"} type='default' onPress={() => searchPermissions()} />
            <View style={styles.attContainer}>
                <MainText title='សម្រង់ច្បាប់​ ប្រចាំខែ' type='title' />
                <View style={{ width: '100%', height: 1, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                {permissions.result != 'ko' ?
                    <FlatList
                        data={permissions}
                        renderItem={({ item, index }) => {
                            var id = item?.id;
                            var name = item?.employeeid;
                            var type = item?.name_kh;
                            var leave = item?.amountday;
                            var Loaderimg = item?.image;
                            var appliedfrom = item?.appliedfrom;
                            var appliedto = item?.appliedto;
                            var reson = item?.reson;
                            return (
                                <View key={index}>
                                    <View style={styles.Itemlist} >
                                        <MainText title={index + 1 + '.'} type='small' />
                                        <TouchableOpacity
                                            opacity={0.8}
                                            onPress={() => { navigation.navigate("Loaderimage", { id, Loaderimg, name, type, leave, appliedfrom, appliedto, reson }) }}
                                            style={{ width: 40, height: 40, borderWidth: 0.5, borderRadius: 4, borderColor: Colors.DEFAULT_ORANGE }} >
                                            <FastImage source={{
                                                uri: image_path + item?.image,
                                                priority: FastImage.priority.normal,
                                                cache: FastImage.cacheControl.immutable
                                            }}
                                                style={{ width: 40, height: 40, borderWidth: 0.5, borderRadius: 4, borderColor: Colors.DEFAULT_ORANGE }}
                                                resizeMode={FastImage.resizeMode.contain}
                                            />
                                        </TouchableOpacity>
                                        {/* <MainText title={item.id} /> */}
                                        <MainText title={item.project_name} pl={2} type="s_small"
                                            style={{ backgroundColor: Colors.DEFAULT_ORANGE, color: Colors.DEFAULT_WHITE, justifyContent: 'center' }} />
                                        <MainText style={styles.rowScanTime_row} title={item.employeeid} type="s_small" pl={2} />
                                        <MainText title={item.name_kh} style={styles.rowScanTime_row} type='s_small' pl={2} />
                                        <MainText style={styles.rowScanTime_row} title={"(" + item.amountday + ")"} type="s_small" pl={2} />
                                        <View style={styles.rowScanTime}>
                                            <MainText title={"Fr: " + item.appliedfrom} type="s_small" pr={2} />
                                            <View style={{ height: 0.8, backgroundColor: Colors.DEFAULT_ORANGE }}></View>
                                            <MainText title={"To: " + item.appliedto} type="s_small" pr={2} />
                                        </View>
                                        {item.status == 0 ? (
                                            <View style={{ backgroundColor: "#D5F5E3", padding: 2, borderRadius: 3 }}>
                                                <MainText title={"Normal"} type="s_small" pr={2} style={{ color: Colors.DEFAULT_SUCCESS }} />
                                            </View>
                                        ) : (
                                            <View style={{ backgroundColor: "#FAC5C5", padding: 2, borderRadius: 3 }}>
                                                <MainText title={"Canceled"} type="s_small" pr={2} style={{ color: Colors.DEFAULT_RED }} />
                                            </View>
                                        )}
                                    </View>
                                    <View style={{ width: '100%', height: 0.4, backgroundColor: Colors.DEFAULT_ORANGE, marginBottom: 2 }}></View>
                                </View>
                            );
                        }}
                    />
                    : (
                        <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <FastImage source={Images.LOGO}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{ width: 200, height: 200, opacity: 0.1 }} />
                            <MainText style={{ color: Colors.DEFAULT_RED }} title='មិនមានទិន្នន័យ!' type='title' />
                        </View>
                    )}
            </View>
        </Layout >
    );
}
export default Permissions;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    DateContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        // alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    DateTimetxt: {
        width: '80%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: Colors.DEFAULT_ORANGE,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
    },
    attContainer: {
        height: '68%',
        marginTop: 20,
        borderWidth: 0.5,
        padding: 4,
        borderRadius: 5,
        borderColor: Colors.DEFAULT_ORANGE,

    },
    Itemlist: {
        flexDirection: "row",
        backgroundColor: Colors.DEFAULT_GREY,
        marginTop: 5,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowScanTime_row: {
        justifyContent: "space-between",
    },
    rowScanTime: {
        flexDirection: 'column',
        // marginLeft: 2
    },
    strikeThroughtextStyle: {
        textDecorationLine: 'line-through',
        color: Colors.DEFAULT_RED
    }
});