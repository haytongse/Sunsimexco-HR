import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from "react-native";
import Layout from "../layout/Layout";
import MainText from "../text/MainText";
import Colors from "../colors/Colors";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../util/request";
function Attendance_List ({ 
    title,
    data,
    navigation
}) {

    return (
        <View style={styles.attendance_container}>
            <MainText title="សម្រង់វត្តមាន 5 ថ្ងៃចុងក្រោយ" type="main" style={{ color: Colors.DEFAULT_GRAY }} />
            <View style={{ borderWidth: 0.3, marginTop: 10, marginBottom: 5, borderColor: Colors.DEFAULT_ORANGE }}></View>
            <View style={styles.ItemHeaderlist}>
                <MainText title="ថ្ងៃខែឆ្នាំ" style={{ color: Colors.DEFAULT_WHITE }} />
                <View style={styles.rowScan}>
                    <MainText title="ម៉ោងចូល/ចេញ" pr={'32%'} style={{ color: Colors.DEFAULT_WHITE }} />
                    {/* <MainText title="ម៉ោងចេញ" pr={'15%'} style={{ color: Colors.DEFAULT_WHITE }} /> */}
                </View>
            </View>
            <View style={{ width: '100%', flexDirection: "row", justifyContent: "space-between", backgroundColor: Colors.DEFAULT_GREY }}>
                <FlatList
                    // numColumns={2}
                    horizontal={true}
                    // refreshControl={
                    //     <RefreshControl
                    //         tintColor={Colors.DEFAULTCOLOR}
                    //         refreshing={refresh}
                    //         onRefresh={() => setRefresh(true)} />
                    // }
                    // nestedScrollEnabled
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.Itemlist} key={index}>
                                <MainText style={styles.rowScanTime_row}  title={item.date_scan} type="sm" />
                                <View style={styles.rowScanTime}>
                                    <MainText title={item.time_scan} type="small" pr={5} />
                                    <MainText title={item.state} type="small" pr={5} />
                                </View>
                            </View>
                        );
                    }}
                />
                
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
    ItemHeaderlist: {
        flexDirection: "row",
        marginTop: 15,
        backgroundColor: Colors.DEFAULT_ORANGE,
        padding: 5,
        justifyContent: "space-between",
        // alignItems: "center",
        overflow: "hidden"
    },
    Itemlist: {
        // flex: 1,
        // width: '100%',
        flexDirection: "row",
        marginTop: 15,
        backgroundColor: Colors.DEFAULT_GREY,
        padding: 5,
        // justifyContent: "space-between",
        // alignItems: "center",
        overflow: "hidden"
    },
    rowScan: {
        // width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 5,
    },
    btnText: {
        width: 50,
        fontSize: 10,
    },
    verticalLine: {
        backgroundColor: Colors.DEFAULT_ORANGE,
        width: 0.5,
        padding: 0
    },
    rowScanTime: {
        width: 100,
        flexDirection: "row",
    },
    rowScanTime_row: {
        width: 400,
        justifyContent: "space-between",

    },
});
export default Attendance_List;