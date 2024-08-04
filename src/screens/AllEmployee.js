import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import Layout from '../component/layout/Layout'
import MainText from '../component/text/MainText';
import Colors from '../component/colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';
import InputText from '../component/input/InputText';
import Button from '../component/button/Button';
import Images from '../component/images/Images';
import Loading from '../component/loading/Loading';
import { request } from '../util/request';
import FastImage from 'react-native-fast-image';
import { image_path } from '../util/service';
const AllEmployee = ({ navigation }) => {
    const [employees, setEmplyees] = useState('');
    const [loading, setLoading] = useState(false);
    const [getEmps, setGetEmps] = useState('');
    const searchEmployee = async () => {
        if (employees === "" || employees === null) {
            setLoading(true);
            await request("getAllEmployees.php", "POST", {}).then(res => {
                setLoading(false);
                if (res) {
                    setGetEmps(res);
                } else {
                    console.log("Date Not Found!");
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            var param = {
                empname: employees,
            }
            setLoading(true);
            await request("getAllEmployees.php", "POST", param).then(res => {
                setLoading(false);
                if (res) {
                    setGetEmps(res);
                } else {
                    console.log("Date Not Found!");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
    return (
        <Layout loading={loading}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-outline" size={25}
                    color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                    onPress={() => navigation.goBack()}
                />
                <MainText title='ពត៌មានបុគ្គលិកទាំងអស់' type='default' />
            </View>
            <View style={styles.txtContainer}>
                <InputText placeholder={'បញ្ចូលឈ្មោះបុគ្គលិក...'} onChangeText={(text) => { setEmplyees(text) }} />
                <Button type='default' title={'ស្វែងរក'} size='md' onPress={() => { searchEmployee() }} />
            </View>
            <View style={styles.empContainer}>
                <MainText title='សម្រង់វត្តមាន​ ពត៌មានបុគ្គលិកទាំងអស់' type='title' />
                <View style={{ width: '100%', height: 1, backgroundColor: Colors.DEFAULT_ORANGE, }}></View>
                {getEmps?.result != 'ko' ?
                    <FlatList
                        data={getEmps}
                        renderItem={({ item, index }) => {
                            var id = item.id;
                            return (
                                <ScrollView>
                                    <View key={index} loading={loading}>
                                        <TouchableOpacity style={styles.empBody} opacity={0.8} onPress={() => { navigation.navigate("PersonalInfo", { id }) }}>
                                            <MainText title={index + 1 + '.'} style={styles.txtIndex} />
                                            <View style={styles.imgConatiner}>
                                                {item.emp_image != '' || item.emp_image != null ? (
                                                    <FastImage source={{
                                                        uri: image_path + item?.emp_image,
                                                        priority: FastImage.priority.normal,
                                                        cache: FastImage.cacheControl.immutable
                                                    }}
                                                        style={{ width: 40, height: 40, marginRight: 5, borderWidth: 0.5, borderRadius: 4, borderColor: Colors.DEFAULT_ORANGE }}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                    />
                                                ) : (
                                                    <FastImage source={{
                                                        uri: image_path,
                                                        priority: FastImage.priority.normal,
                                                        cache: FastImage.cacheControl.immutable
                                                    }}
                                                        style={{ width: 40, height: 50, marginRight: 5, borderWidth: 0.5, borderRadius: 4, borderColor: Colors.DEFAULT_ORANGE }}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                    />
                                                )}
                                            </View>
                                            <View style={styles.projectnameContainer}>
                                                <MainText title={item.employeeid} type='default' style={{ color: Colors.DEFAULT_ORANGE }} />
                                            </View>
                                            <View style={styles.projectnameContainer}>
                                                <MainText title={item.project_name} />
                                            </View>
                                            <View>
                                                <MainText title={item.emp_name} />
                                                <MainText title={item.emp_name_kh} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
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
        </Layout >
    )
}

export default AllEmployee;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    txtContainer: {
        marginBottom: 10
    },
    empContainer: {
        height: '68%',
        marginTop: 20,
        borderWidth: 0.5,
        padding: 4,
        borderRadius: 5,
        borderColor: Colors.DEFAULT_ORANGE,
    },
    txtIndex: {
        marginRight: 5
    },
    empBody: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    projectnameContainer: {
        marginRight: 10,
    }
});