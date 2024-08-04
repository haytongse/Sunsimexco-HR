import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({
    title,
    onPress,
    size = "md",
    round = true,
    type ="primary",
    ml = 0,
    mr =0,
    mt = 0,
    mb = 0, 
    iconLeft,
    iconRight,
    iconCenter,
    borderRadiuss = false,
    // isDisable = false
})=>{
    var style = {}
    switch (size){
        case "ss" : style.height = 15; break;
        case "sm" : style.height = 30; break;
        case "md" : style.height = 36; break;
        case "lg" : style.height = 40; break;
        case "b_lg" : style.height = 60; break;
        case "big" : style.height = 80; break;
    }
    switch(type){
        case "primary": style.backgroundColor = "#0D6EFD"; break;
        case "secondary": style.backgroundColor = "#6C757D"; break;
        case "success": style.backgroundColor = "#198754"; break;
        case "warning": style.backgroundColor = "#FFC107"; break;
        case "danger": style.backgroundColor = "#DC3545"; break;
        case "default": style.backgroundColor = "#D86C27"; break;
    }
    style.marginLeft = ml
    style.marginRight = mr
    style.marginTop = mt
    style.marginButtom = mb
    if (round == false) {
        style.borderRadius = 0;
    }
    if (borderRadiuss == true) {
        style.borderRadius = 50;
    }
    return(
        <TouchableOpacity onPress={onPress} 
        // disabled={isDisable}
        style={[styles.btnContainer, style]}>
            {iconLeft && 
                <View>
                    {iconLeft}
                </View>
            }
            {title && <Text style={styles.txtButton}>{title}</Text>}
            {iconRight && 
                <View>
                    {iconRight}
                </View>
            }
             {iconCenter && 
                <View>
                    {iconCenter}
                </View>
            }
        </TouchableOpacity>
    );
}

export default Button;
const styles = StyleSheet.create({
    btnContainer:{
        backgroundColor: "#000",
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    txtButton:{
        // fontWeight: "bold",
        color: 'white',
        fontSize: 12,
        textAlign: "center",
    }
})