import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import Button from "../component/button/Button";
import InputText from "../component/input/InputText";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import MainText from "../component/text/MainText";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../component/colors/Colors";
import Loading from "../component/loading/Loading";
import FastImage from "react-native-fast-image";
import Radio from "../component/radio/Radio";
import CheckBox from "../component/checkbox/CheckBox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Feather from 'react-native-vector-icons/Feather';
import { request } from "../util/request";
const SignupScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const { mood, setMood } = useState('');
    const [isStudent, setISStudent] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectDate, setSelectDate] = useState('Select DOB');
    const [errSelectDate, setErrSelectData] = useState(null);
    const [gender, setGender] = useState("1");
    const [isPasswordShow, setPasswordShow] = useState(false);
    const [password, setPassword] = useState("");
    const [errPassword, setErrPassword] = useState(null);
    const [username, setUsername] = useState("");
    const [errUsername, setErrUsername] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errPhoneNumber, setErrPhoneNumber] = useState(null);
    const [national, setNational] = useState("");
    const [errNational, setErrNational] = useState(null);
    const [address, setAddress] = useState("");
    const [errAddress, setErrAddress] = useState(null);
    const [email, setEmail] = useState("");
    const [errEmail, setErrEmail] = useState(null);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        const dt = new Date(date);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        // console.log(x1[2] + '/' + x1[1] + '/' + x1[0]);
        setSelectDate(x1[0] + '-' + x1[1] + '-' + x1[2]);
        hideDatePicker();
    };
    const handleLogin = async () => {
        // setUsername(null);
        // setSelectDate(null);
        // setPassword(null);
        // setPhoneNumber(null);
        // setNational(null);
        // setAddress(null);
        // setEmail(null);
        var isError = false;
        if (username == "" || username == null) {
            setErrUsername("Please fill in Employee name!");
            isError = true;
        } else if (selectDate == null || selectDate == "" || selectDate == "Select DOB") {
            setErrSelectData("Please select your DOB!");
            isError = true;
        }else if(password == "" || password == null ){
            setErrPassword("Please fill in password!");
            isError = true;
        }else if(phoneNumber == "" || phoneNumber == null){
            setErrPhoneNumber("Please fill in phone number!");
            isError = true;
        }else{
            if(!isError){
                var param={
                    name: username,
                    password: password,
                    gender: gender,
                    dob: selectDate,
                    phoneNumber: phoneNumber,
                    national: national,
                    address: address,
                    email: email
                }
                setLoading(true);
                await request("emp_register.php","POST",param).then(res =>{
                    if(res){
                        setLoading(false);
                        console.log(res);
                    }
                }).catch(err =>{
                    console.log(err);
                })
            }
        }
    }
    return (
        <Layout loading={loading}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-outline" size={25}
                    color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                    onPress={() => navigation.goBack()}
                />
                <MainText title="New Employee" type="default" />
                
            </View>
            <ScrollView>
                <View style={styles.InputContainer}>
                    <View style={styles.txtInput}>
                        <MainText title="Create New Employee" type="main_title" pb={20} />
                    </View>
                    <View style={styles.txtInput}>
                        <InputText
                            label={"Employee name:"}
                            placeholder={'Enter name'}
                            msError={errUsername}
                            onChangeText={(text) => {
                                setUsername(text)
                            }}
                        />
                    </View>
                    <View style={styles.txtInput}>
                        <MainText title="Gender" type="default" pb={5} />
                        <View style={{ flexDirection: "row", }}>
                            <Radio label="Male" pb={10} pr={10} isCheck={gender == "1"} onPress={() => setGender("1")} />
                            <Radio label="Female" pb={10} isCheck={gender == "2"} onPress={() => setGender("2")} />
                        </View>
                    </View>
                    <View style={styles.txtInput}>
                        <MainText title="DOB:" type="default" />
                        <TouchableOpacity

                            onPress={() => { showDatePicker() }}
                            style={styles.DateTimetxt}>
                            {selectDate != 'Select DOB' ? (
                                <Text style={{ fontSize: 16, paddingLeft: 5, marginTop: 8 }}>{selectDate}</Text>
                            ) : (
                                <Text style={{ fontSize: 16, paddingLeft: 5, marginTop: 8, opacity: 0.4 }}>{selectDate}</Text>
                            )}
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <Text style={{ fontSize: 12, marginBottom: 3, color: Colors.DEFAULT_RED }}>{errSelectDate}</Text>
                    </View>
                    <View style={styles.txtInput}>
                        <View>
                            <InputText
                                label={"Password"}
                                msError={errPassword}
                                placeholder={'Enter password'}
                                secureTextEntry={isPasswordShow ? false : true}
                                onChangeText={(text) => {
                                    setPassword(text)
                                }}
                                iconRight={<Feather name='eye' size={20} />}
                            />
                        </View>
                    </View>
                    <View style={styles.txtInput}>
                        <InputText
                            label={"Phone:"}
                            msError={errPhoneNumber}
                            placeholder={'Enter phone number'}
                            onChangeText={(text)=>{
                                setPhoneNumber(text)
                            }}
                        />
                    </View>
                    <View style={styles.txtInput}>
                        <InputText
                            label={"National:"}
                            placeholder={'Enter national'} 
                            onChangeText={(text)=>{
                                setNational(text);
                            }}/>
                    </View>
                    <View style={styles.txtInput}>
                        <InputText
                            label={"Address:"}
                            onChangeText={(text)=>{
                                setAddress(text)
                            }}
                            placeholder={'Enter address'} />
                    </View>
                    <View style={styles.txtInput}>
                        <InputText
                            label={"Email:"}
                            onChangeText={(text)=>{
                                setEmail(text)
                            }}
                            placeholder={'Enter Email'} />
                    </View>
                    <View style={{ width: '100%', marginTop: 50 }}>
                        <Button title={'Sign Up'} type="default" size="lg"
                            iconRight={<Ionicons name="person-add" size={25}
                                style={{ color: Colors.DEFAULT_WHITE, marginLeft: 10 }} />}
                            onPress={() => handleLogin()}
                        />
                    </View>
                </View>
            </ScrollView>
        </Layout>
    );
}
export default SignupScreen;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    InputContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    txtInput: {
        width: '100%',
    },
    profile_container: {
        width: 120,
        height: 120,
        overflow: "hidden",
        borderRadius: 60,
        borderWidth: 4,
        borderColor: Colors.DEFAULT_ORANGE
    },
    profileImg: {
        width: 120,
        height: 120,
        justifyContent: "center",
        alignSelf: "center",
    },
    outter: {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5
    },
    inner: {
        width: 15,
        height: 15,
        backgroundColor: Colors.DEFAULT_ORANGE,
        borderRadius: 10,
    },
    wrapper: {
        flexDirection: "row",
    },
    mood: {
        marginHorizontal: 10
    },
    txtInputGender: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.DEFAULT_ORANGE,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10
    },
    DateTimetxt: {
        width: '100%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: Colors.DEFAULT_ORANGE,
        fontSize: 15,
        marginBottom: 5,
    }
}
);
