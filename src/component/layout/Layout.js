import React from "react";
import { View,ScrollView, SafeAreaView,  } from "react-native";
import Styles from "./Styles";
import Loading from "../loading/Loading";
function Layout({
    children,
    loading=false
}){
    return(
        <SafeAreaView style={{height: '100%', flex: 1,}}>
            {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
                <Loading loading={loading}/>
                <View style={Styles.container}>
                    {children}
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}
export default Layout;