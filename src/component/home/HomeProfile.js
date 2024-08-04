import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import MainText from '../text/MainText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../colors/Colors';
import { useDispatch, useSelector } from "react-redux";
import { image_path } from '../../util/service';
const HomeProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.profile);
    return (
        // <View style={styles.container}>
        //     <View style={styles.profile_container}>
        //         <TouchableOpacity style={styles.profileImgContainer}>
        //             <Image source={{ uri: `${`https://card.sunsimexco.com/HR-Admin/uploads/` + profile?.image}` }} style={styles.profileImg} />
        //         </TouchableOpacity>
        //         <View style={styles.txtProfile}>
        //             <MainText title='សួស្តី' type='default' pl={8} style={{ color: Colors.DEFAULT_WHITE }} />
        //             <View style={{ flexDirection: 'row', }}>
        //                 <MainText title={profile?.name} type='main' pl={5} style={{ color: Colors.DEFAULT_WHITE }} />
        //                 <MainText title={profile?.lon} />
        //                 <View style={{ width: 20, height: 20, backgroundColor: Colors.DEFAULT_WHITE, borderRadius: 100 }}>
        //                     {profile?.emp_status != 0 ? (
        //                         <MaterialIcons name='verified' size={20} style={{color: Colors.DEFAULT_PRIMARY }} />
        //                     ) : (
        //                         <MaterialIcons name='verified' size={20} style={{color: Colors.DEFAULT_GRAY }} />
        //                     )}
        //                 </View>
        //             </View>
        //             <MainText pl={5} title={profile?.phone} type='main' style={{ color: Colors.DEFAULT_WHITE }} />
        //         </View>
        //     </View>
        // </View>
        <View style={styles.container_pc}>
                    <View style={styles.profile_container}>
                        <TouchableOpacity style={styles.profileImgContainer}>
                            <Image source={{ uri: `${`https://card.sunsimexco.com/HR-Admin/uploads/` + profile?.image}` }}
                                style={styles.profileImg}
                                transition={false} />
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
                </View>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    profile_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        color: Colors.DEFAULT_WHITE
    },
    notification: {
        marginTop: 10,
    }
});
export default HomeProfile;