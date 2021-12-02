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
import {LinearGradient} from 'expo-linear-gradient'

const AuthScreen = () =>{
    return(
        <KeyboardAvoidingView
         style = {styles.screen}
         keyboardVerticalOffset={50} 
        >
        <LinearGradient colors={[Color.accent,Color.primary,Color.darkGray]} style={styles.gradient} >
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
                    <View style={styles.buttonContainer}>
                    <Button
                    title = "Login"
                    color = {Color.primary}
                    onPress={() => {}}
                    />
                    </View>

                    <View style={styles.buttonContainer}>
                   <Button
                    title = "Switch to Sign Up"
                    color = {Color.accent}
                    onPress={() => {}}
                    />
                    </View>

                </ScrollView>
            </Card>
        </LinearGradient>

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
    },
    gradient:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer:{
        marginTop: 10,
    }
})

export default AuthScreen;