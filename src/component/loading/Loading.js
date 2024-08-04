import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import MainText from "../text/MainText";
function Loading({
    loading = false
}){
    if(!loading) return null;
    return(
        <View style={styles.container}>
            <View style={styles.containerLoad}>
                <ActivityIndicator size={'large'}/>
                <MainText title="Loading..." type="default"/>
            </View>
        </View>
    );
}
export default Loading;
const styles = StyleSheet.create({
    container:{
        width: '100%',
        flex: 1,
        position: "absolute",
        zIndex: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#F9F9F9",
    },
    containerLoad:{
        // backgroundColor: "#F9F9F9",
        backgroundColor: 'rgba(0,0,0,0.01)',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    }
})