import { View, Text, StyleSheet, TextInput } from "react-native";
const InputText = ({
    label,
    placeholder,
    onChangeText,
    require=false,
    msError,
    width ="100%",
    pl=0,
    pr=0,
    pt=0,
    pb=0,
    multiline=false,
    value,
    autoCapital="none",
    secureTextEntry=false,
    iconRight="",
})=>{
    const borderColor = (msError !=null ? "red":"#D86C27");
    return(
        <View style={{width: width, paddingLeft: pl, paddingRight: pr}}>
            <Text>{label}{require && "*"}</Text>
            <View style={[styles.inputContainer, {borderColor: borderColor, height:multiline ? 60 : 45}]}>
                <TextInput
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapital}
                    value={value}
                    numberOfLines={2}
                    style={styles.inputText}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    iconRight={iconRight}
                />
            </View>
            <Text style={styles.textError}>{msError}</Text>
        </View>
    );
}
export default InputText;
const styles = StyleSheet.create({
    inputContainer:{
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
    },
    inputText:{
        fontSize:15,
        paddingHorizontal: 10,
    },
    textLabel:{
        fontSize: 16,
        color: "#000",
    },
    textError:{
        color: 'red',
    }
});