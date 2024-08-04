import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Image, Dimensions, ScrollView } from "react-native";
import Layout from "../component/layout/Layout";
import MainText from "../component/text/MainText";
import Button from "../component/button/Button";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../component/colors/Colors";
import QRCode from 'react-native-qrcode-svg';
import Images from "../component/images/Images";
import { useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
const QrCodeByShowroom = ({ navigation }) => {
    const SCREEN_WIDTH = Dimensions.get("window").width;
    const SCREEN_HEIGHT = Dimensions.get("window").height;
    const scanBarWidth = SCREEN_WIDTH * 0.42;
    const { profile } = useSelector(state => state.profile);
    const { loading, setLoading } = useState(false);
    const [qrValue, setQRValue] = useState('');
    const [isActive, setIsActive] = useState(false);
    const project_name = profile?.project_name;
    useEffect(() => {
        generateQRCode();
    }, []);
    const generateQRCode = () => {
        if (!qrValue) return;
        setIsActive(true);
    };

    const handleInputChange = (text) => {
        setQRValue(text);
        if (!text) {
            setIsActive(false);
        }
    };
    let logoFromFile = require('../assets/images/logo.png');
    return (
        <Layout>

            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-outline" size={25}
                    color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                    onPress={() => navigation.goBack()}
                />
                <MainText title='QR Code' type='default' />
            </View>
            <View style={styles.wrapperContainer}>
                <View style={styles.wrapper}>
                    <View style={styles.qrCodeHeader}>
                        <MainText title={"QRCODE"} style={styles.qrcodeTitle} />
                    </View>
                    <View style={styles.qrCodeRight}></View>
                    <FastImage source={Images.LOGO}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ width: '30%', height: '30%', marginTop: -50, justifyContent: "center", alignSelf: "center", marginBottom: 30 }} />
                    <View style={{ width: '100%', height: '50%', marginTop: -40, justifyContent: "center", alignItems: "center" }}>
                        <QRCode
                            innerEyeStyle='square'
                            value={project_name}
                            logo={logoFromFile}
                            logoSize={80}
                            size={scanBarWidth}
                        />
                    </View>
                </View>
                <View style={styles.projectContainer}>
                    <MainText title={profile?.project_name} style={styles.projectTitle} />
                </View>
            </View>
        </Layout>
    );
}
export default QrCodeByShowroom;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    wrapperContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignSelf: "center",
        padding: 20,
    },
    wrapper: {
        width: '100%',
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 30,
        // justifyContent: "center",
        // alignSelf: "center"
    },
    qrCodeHeader: {
        width: null,
        height: '14%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        resizeMode: 'cover',
        backgroundColor: Colors.DEFAULT_ORANGE,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: -45
    },
    qrCodeRight: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 60,
        borderTopWidth: 60,
        borderRightColor: "transparent",
        borderTopColor: Colors.DEFAULT_ORANGE,
        transform: [{ rotate: "90deg" }],
        backgroundColor: '#fff',
        alignSelf: "flex-end"
        // left: '86.7%',
    },
    qrcodeTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.DEFAULT_WHITE
    },
    projectContainer: {
        width: '90%',
        height: '8%',
        backgroundColor: Colors.DEFAULT_BLACK,
        marginTop: 30,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 15
    },
    projectTitle: {
        fontSize: 20,
        color: Colors.DEFAULT_WHITE,
        fontWeight: 'bold',
        justifyContent: "center",
        alignSelf: "center"
    }
});