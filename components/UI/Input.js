import React from "react";
import {View,Text,TextInput,StyleSheet} from 'react-native';

const Input = props =>{
    return(
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.inputType}</Text>
            <TextInput 
            {...props.textInputProps}
            value={props.value} 
            style={styles.input} 
            onChangeText={props.titleHandler} 
            />
            {!props.formValidation && <View> 
                <Text style={styles.warningStyle} >Please enter a valid {props.inputType}!</Text>
                </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    formControl:{
        width: "100%"
    },
    label:{
        fontFamily: 'titleFont',
        marginVertical: 8,

    },
    input:{
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5,
        fontFamily: 'textFont',
    },
    warningStyle:{
        fontFamily: 'textFont',
        color: 'red',
    }
})

export default Input;