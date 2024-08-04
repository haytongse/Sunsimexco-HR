import React from "react";
import { View, Text } from "react-native";
import Styles from "./Styles";
function MainText({
    title ="",
    type= "defualt", // default | main | title
    pl = 0,
    pr = 0,
    pt=0,
    pb=0,
    numberOfLines=1,
    style={}
}){
    var sty = {

    }
    switch(type){
        case "s_small" : sty=Styles.s_small; break;
        case "small" : sty=Styles.small; break;
        case "defualt" : sty=Styles.default; break;
        case "main" : sty=Styles.main; break;
        case "title" : sty=Styles.title; break;
        case "main_title" : sty=Styles.main_title; break;
    }
    sty = {
        ...sty, 
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
        paddingBottom: pb,
        ...style

    }
    return(
        <View>
            <Text numberOfLines={numberOfLines} style={sty}>{title}</Text>
        </View>
    );
}
export default MainText;