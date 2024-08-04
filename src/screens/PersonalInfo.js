import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Layout from '../component/layout/Layout';
import MainText from '../component/text/MainText';
import Loading from '../component/loading/Loading';
import Colors from '../component/colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { request } from '../util/request';
import FastImage from 'react-native-fast-image';
import { image_path } from '../util/service';
const PersonalInfo = ({ route, navigation }) => {
    const { id } = route.params;
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getInfo()
    }, []);
    const getInfo = () => {
        var params = {
            id: id,
        }
        setLoading(true);
        request("personalInfo.php", "POST", params).then(res => {
            setLoading(false);
            if (res) {
                setInfo(res)
                console.log(res);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const children = parseInt(info?.emp_children);
    return (
        <Layout loading={loading}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-outline" size={25}
                    color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                    onPress={() => navigation.goBack()}
                />
                <MainText title='ពត៌មានផ្ទាល់ខ្លួនបុគ្គលិក' type='default' />
            </View>
            {info != '' || info != null ? (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.profile_container}>
                            <TouchableOpacity style={styles.profileImgContainer}>
                                <FastImage source={{
                                    uri: image_path + info?.emp_image,
                                    priority: FastImage.priority.normal
                                }}
                                    style={styles.profileImg}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bodyContainer}>
                            <View style={styles.empContainer}>
                                <MainText title='ពត៌មានផ្ទាល់ខ្លួនរបស់បុគ្គលិក ' type='default' style={styles.empText} />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'សាខា-BU'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.project_name} type='default' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'លេខសម្គាល់បុគ្គលិក-EMPLOYEE ID'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.employeeid} type='default' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ឈ្មោះ- FULL NAME'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                {info?.emp_name_kh == '' || info?.emp_name == null ? (
                                    <></>
                                ) : (<MainText title={info?.emp_name_kh + '-' + info?.emp_name} type='default' />)}

                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ភេទ-SEX'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                {info?.emp_gender == '' || info?.emp_gender == null ? (
                                    <></>
                                ) : (
                                    <>
                                        {info?.emp_gender == 1 ? (
                                            <MainText title={'ប្រុស-Male'} type='default' />
                                        ) : (
                                            <MainText title={'ស្រី-Female'} type='default' />
                                        )}
                                    </>

                                )}
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'តួនាទី-POSITION'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_bu} type='default' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'សញ្ជាតិ-NATIONALITY'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_nationality} type='default' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'លេខអត្តសញ្ញាណប័ណ្ឌ-NATIONAL ID'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_card_number} type='default' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ថ្ងៃខែឆ្នាំកំណើត-DOB'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_dob} type='default' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ទីកន្លែងកំណើត-POB'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_pob} type='small' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'អាសយដ្ឋាន-ADDRESS'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_address} type='small' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'លេខទូរស័ព្ទ-PHONE'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_phone} type='defualt' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'អុីម៉ែល-EMAIL'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_email} type='defualt' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'អ្នកណែនាំ-REFERENCE'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_reference} type='defualt' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ស្ថានភាពគ្រួសារ-STATUS'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_note} type='defualt' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ប្តី ឬ ប្រពន្ធ-SPOUSE'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={info?.emp_spouse_name} type='defualt' />
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'កូន-CHILDREN'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                {info?.emp_children == '' || info?.emp_children == null ? (
                                    <></>
                                ) : (
                                    <MainText title={children + ' ' + 'នាក់'} type='defualt' />
                                )}
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoBody}>
                                <MainText title={'ទំនាក់ទនង-CONTACT US'} type='defualt' />
                            </View>
                            <View style={styles.infoBody}>
                                <MainText title={'023 218 278 | 023 217 387'} type='defualt' />
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <View style={styles.empContainer}>
                            <MainText title='ប្រវិត្តការផ្លាស់ប្តូរ ' type='default' style={styles.empText} />
                        </View>
                    </View>
                    {info?.idchanged == null || info?.idchanged == null ? (
                        <View style={{justifyContent: 'center',alignItems: 'center', marginBottom: 50}}>
                            <MainText title='មិនមានការផ្លាស់ប្តូរ' type='main_title' style={{color: Colors.DEFAULT_ORANGE}}/>
                        </View>

                    ) : (
                        <>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBody}>
                                    <MainText title={'សាខា ថ្មី-BU'} type='defualt' />
                                </View>
                                <View style={styles.infoBody}>
                                    <MainText title={info?.newProject} type='defualt' />
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBody}>
                                    <MainText title={'សាខា ចាស់-BU'} type='defualt' />
                                </View>
                                <View style={styles.infoBody}>
                                    <MainText title={info?.oldProject} type='defualt' />
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBody}>
                                    <MainText title={'តួនាទីថ្មី-POSITION'} type='defualt' />
                                </View>
                                <View style={styles.infoBody}>
                                    <MainText title={info?.newPosition} type='defualt' />
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBody}>
                                    <MainText title={'តួនាទីចាស់-POSITION'} type='defualt' />
                                </View>
                                <View style={styles.infoBody}>
                                    <MainText title={info?.oldPosition} type='defualt' />
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBody}>
                                    <MainText title={'ថ្ងៃខែផ្លាស់ប្តូរ-CHANGED'} type='defualt' />
                                </View>
                                <View style={styles.infoBody}>
                                    <MainText title={info?.date_changed} type='defualt' />
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoBody}>
                                    <MainText title={'មូលហេតុ-RESON'} type='defualt' />
                                </View>
                                <View style={styles.infoBody}>
                                    <MainText title={info?.reson} type='defualt' />
                                </View>
                            </View>
                        </>
                    )}

                </ScrollView>

            ) : (
                <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                    <Image source={Images.LOGO} resizeMode='contain' style={{ width: 200, height: 200, opacity: 0.1 }} />
                    <MainText style={{ color: Colors.DEFAULT_RED }} title='មិនមានទិន្នន័យ!' type='title' />
                </View>
            )}

        </Layout>
    )
}

export default PersonalInfo;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 10,
    },
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        marginTop: 5,
    },
    profile_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImgContainer: {
        width: 180,
        height: 180,
    },
    profileImg: {
        width: 180,
        height: 180,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: Colors.DEFAULT_ORANGE,
    },
    verifyContainer: {
        width: 32,
        height: 32,
        marginLeft: -25,
        marginTop: 55,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_WHITE,
        borderRadius: 16,

    },
    bodyContainer: {
        width: '100%',
        backgroundColor: Colors.DEFAULT_ORANGE,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5
    },
    empContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    empText: {
        color: Colors.DEFAULT_WHITE,
        fontWeight: 'bold'
    },
    infoContainer: {
        // padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderColor: Colors.DEFAULT_ORANGE
    },
    infoBody: {
        justifyContent: 'center',
        // padding: 5
    }

});