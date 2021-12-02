import React from "react";
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    Button
} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Color from "../../constants/Color";

const AuthScreen = () =>{
    return(
        <KeyboardAvoidingView
         style = {styles.screen}
         keyboardVerticalOffset={50} 
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                      inputType = 'Email'
                      value = ""
                      KeyboardType="email-address"
                      autoCapitalize = "none"
                      titleHandler = {() => {}}
                      formValidation = {false}
                      textInputProps = {
                          {
                            KeyboardType:"email-address",
                            autoCapitalize: "none"   
                          }
                      }
                    />

                    <Input
                      inputType = "Password"
                      textInputProps = {
                          {
                            KeyboardType:"default",
                            minLength: 5,
                            autoCapitalize: "none"
                          }
                      }
                      formValidation = {false}
                      titleHandler = {() => {}}
                    />
  
                    <Button
                    title = "Login"
                    color = {Color.primary}
                    onPress={() => {}}
                    />

                   <Button
                    title = "Switch to Sign Up"
                    color = {Color.accent}
                    onPress={() => {}}
                    />

                </ScrollView>
            </Card>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer:{
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    }
})

export default AuthScreen;