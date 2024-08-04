import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../colors/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainText from "../text/MainText";
const Radio = ({
    label = "",
    isCheck = false,
    onPress,
    pl = 0,
    pr = 0,
    pt = 0,
    pb = 0,
}) => {
    var style_tmp = {}
    style_tmp.paddingTop = pt;
    style_tmp.paddingBottom = pb;
    style_tmp.paddingLeft = pl;
    style_tmp.paddingRight = pr;


    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.mainContainer, ...style_tmp }} >
            <View style={styles.container}>
                {isCheck && <View style={styles.activeBox} />}
            </View>
            <MainText title={label} pl={8} />
        </TouchableOpacity>
    );
}
export default Radio;
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_ORANGE,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    activeBox: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.DEFAULT_ORANGE,
        shadowColor: Colors.DEFAULT_ORANGE,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 6,

        elevation: 8,
    }
});