import React from 'react'
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import MainText from '../component/text/MainText'
import Layout from '../component/layout/Layout';
import Button from '../component/button/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Images from '../component/images/Images';
import Colors from '../component/colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const PermissionScreen = ({ navigation }) => {
    const data_permission = [
        {
            title: "ស្នើសុំច្បាប់​ តាមលក្ខណ៍",
            route: "longPermission",
            icon: "account-multiple-check-outline",
            color: Colors.DEFAULT_ORANGE
        },
        {
            title: "ស្នើសុំច្បាប់ បន្ទាន់",
            route: "shortPermission",
            icon: "account-cog",
            color: Colors.DEFAULT_RED
        },
    ];
    const onPressPermission = (item) => {
        navigation.navigate(item.route);
    }
    return (
        <Layout>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-outline" size={25}
                        color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                        onPress={() => navigation.goBack()}
                    />
                    <MainText title='ស្នើច្បាប់' type='default' />
                </View>
                <View style={styles.loginContainer}>
                    <Image source={Images.LOGO} resizeMode='contain' style={styles.image} />
                </View>
                {data_permission?.map((item, index) => {
                    return (
                        <View style={styles.btnContainer} key={index}>
                            <TouchableOpacity activeOpacity={0.8} style={[styles.btnPermission, { backgroundColor: item.color }]}
                                // onPress={() => { onPressPermission(item) }}
                                
                                >
                                <MaterialCommunityIcons name={item.icon} size={50} color={Colors.DEFAULT_WHITE} />
                                <MainText title={item.title} style={styles.txtPermission} />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </Layout>
    )
};

const styles = StyleSheet.create({
    container: {
        // marginTop: 20,
        justifyContent: 'center'
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        marginBottom: 20,
    },
    image: {
        height: 100,
        alignSelf: 'center'
    },
    btnContainer: {
        width: '100%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnPermission: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.DEFAULT_ORANGE,
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: Colors.DEFAULT_WHITE,
    },
    txtPermission: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
});
export default PermissionScreen;
