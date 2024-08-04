import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Layout from "../layout/Layout";
import MainText from "../text/MainText";
import Colors from "../colors/Colors";
import Button from "../button/Button";

const Permission_List = ({ navigation }) => {
    return (
        <View style={styles.attendance_container}>
            <MainText title="ច្បាប់របស់ខ្ញុំប្រចាំខែ" type="main" style={{ color: Colors.DEFAULT_GRAY }} />
            <View style={{borderWidth: 0.3, marginTop: 10, marginBottom: 5, borderColor: Colors.DEFAULT_ORANGE}}></View>
            <View style={styles.Itemlist}>
                <MainText title="10-09-2023" />
                <View style={styles.rowScan}>
                <MainText title="0.5 day"/>
                </View>
                <Button title={"Approved"} size="sm" type="primary" style={styles.btnText} />
            </View>
            <View style={styles.Itemlist}>
                <MainText title="09-09-2023" />
                <View style={styles.rowScan}>
                    <MainText title="1 day"/>
                </View>
                <Button title={"Approved"} size="sm" type="primary" style={styles.btnText} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    attendance_container: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.DEFAULT_ORANGE,
        borderRadius: 10,
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 10,
    },
    Itemlist: {
        flexDirection: "row",
        marginTop: 15,
        backgroundColor: Colors.DEFAULT_GREY,
        // borderRadius: 5,
        padding: 5,
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden"
    },
    rowScan: {
        width: '30%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 20,
        alignItems: "center"
    },
    btnText: {
        width: 50,
        fontSize: 10,
    }
});
export default Permission_List;