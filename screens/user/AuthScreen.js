import React,{useReducer} from "react";
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
import {LinearGradient} from 'expo-linear-gradient';
import * as authActions from '../../store/actions/authAction'
import {useDispatch} from 'react-redux';

const AUTH_INPUT_UPDATE = 'AUTH_INPUT_UPDATE';
const formReducer = (state,action) =>{
    switch(action.type){
        case AUTH_INPUT_UPDATE:
            return {...state,[action.inputFieldName]: action.authText}
        default:
            return state
    }
}

const initialState = {
    email: null,
    password: null
}
const AuthScreen = () =>{

    const dispatch = useDispatch();
    const [formState,formStateDispatch] = useReducer(formReducer,initialState);

    const authInputHandler = (inputFieldName,text) =>{
        formStateDispatch({
            type: AUTH_INPUT_UPDATE,
            inputFieldName: inputFieldName,
            authText: text
        })
    }

    return(
        <KeyboardAvoidingView
         style = {styles.screen}
         keyboardVerticalOffset={50} 
        >
        <LinearGradient 
        colors={[Color.accent,Color.primary,Color.darkGray,Color.accent,Color.primary,Color.darkGray]} 
        style={styles.gradient} 
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                      inputType = 'Email'
                      value = {formState.email}
                      KeyboardType="email-address"
                      autoCapitalize = "none"
                      titleHandler = {authInputHandler.bind(this,'email')}
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
                      value = {formState.password}
                      textInputProps = {
                          {
                            KeyboardType:"default",
                            minLength: 5,
                            autoCapitalize: "none"
                          }
                      }
                      formValidation = {false}
                      titleHandler = {authInputHandler.bind(this,'password')}
                    />
                    <View style={styles.buttonContainer}>
                    <Button
                    title = "Login"
                    color = {Color.primary}
                    onPress={() => {dispatch(authActions.Signup(formState.email,formState.password))} }
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