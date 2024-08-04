import React, { useState, useRef } from 'react'
import { View, StyleSheet, ScrollView, Animated, Text, Image } from 'react-native'
import MainText from '../component/text/MainText'
import Layout from '../component/layout/Layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../component/colors/Colors';
import FastImage from 'react-native-fast-image';
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import ReactNativeZoomableView from '../component/zoom/ReactNativeZoomableView';
import { image_path } from '../util/service';
const LoaderImage = ({ route, navigation }) => {
    const { id, Loaderimg, name, type, appliedfrom, appliedto, leave, reson } = route.params;
    const [loading, setLoading] = useState(false);
    const scale = React.useRef(new Animated.Value(1)).current;
    const translateX = React.useRef(new Animated.Value(0)).current;
    const handlePinch = Animated.event([{ nativeEvent: { scale } }]);
    const handlePan = Animated.event(
        [
            {
                nativeEvent: {
                    translationX: translateX
                },
            },
        ],
        {
            listener: e => console.log(e.nativeEvent),
            useNativeDriver: true,
        });
    return (
        <Layout loading={loading}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-outline" size={25}
                    color={Colors.DEFAULT_BLACK} backgroundColor={"tran"}
                    onPress={() => navigation.goBack()}
                />
                <MainText title='ពាក្យសុំច្បាប់ របស់ខ្ញុំ' type='default' />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.DEFAULT_ORANGE, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <MainText title={"ឈ្មោះ : " + name} type='title' style={{ color: Colors.DEFAULT_WHITE }} />
                <MainText title={"ការឈប់សំរាក : " + type} type='title' style={{ color: Colors.DEFAULT_WHITE }} />
                <MainText title={"ចំនួនថ្ងៃសុំច្បាប់ : " + leave} type='title' style={{ color: Colors.DEFAULT_WHITE }} />
                <View style={{ flexDirection: 'row' }}>
                    <MainText title={"ស្នើសុំពីថ្ងៃ : " + appliedfrom} type='default' style={{ color: Colors.DEFAULT_WHITE }} />
                    <MainText title={" - ស្នើសុំដល់ថ្ងៃ : " + appliedto} type='default' style={{ color: Colors.DEFAULT_WHITE }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <MainText title={"មូលហេតុ : " + reson} type='default' style={{ color: Colors.DEFAULT_WHITE }} />
                </View>
            </View>
            <ReactNativeZoomableView>
                <FastImage source={{
                    uri: image_path + Loaderimg,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable
                }}
                    style={styles.zoomedImg}
                    resizeMode={FastImage.resizeMode.contain}/>
            </ReactNativeZoomableView>
        </Layout>
    )
}
export default LoaderImage;
const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 10
    },
    zoomedImg: {
        width: null,
        height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});