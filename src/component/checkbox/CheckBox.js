import React from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import Colors from "../colors/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainText from "../text/MainText";
const CheckBox = ({ 
    label = "",
    isCheck = false,
    onPress,
    pl = 0,
    pr = 0,
    pt=0,
    pb=0,
 }) => {
    var style_tmp = {}
        style_tmp.paddingTop = pt;
        style_tmp.paddingBottom = pb;
        style_tmp.paddingLeft =  pl;
        style_tmp.paddingRight = pr;

    
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.mainContainer, ...style_tmp}} >
            <View style={styles.container}>
                {isCheck && <AntDesign name="check" style={{fontSize: 18}}/>}
            </View>
            <MainText title={label} pl={8}/>
        </TouchableOpacity>
    );
}
export default CheckBox;
const styles = StyleSheet.create({
    mainContainer:{
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_ORANGE,
        alignItems: "center",
        justifyContent: "center"
    }
});