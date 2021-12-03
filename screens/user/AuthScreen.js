import React,{useReducer} from "react";
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    Button,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Color from "../../constants/Color";
import {LinearGradient} from 'expo-linear-gradient';
import * as authActions from '../../store/actions/authAction'
import {useDispatch} from 'react-redux';
import {StackActions} from '@react-navigation/native';

const AUTH_INPUT_UPDATE = 'AUTH_INPUT_UPDATE';
const SWITCH_UPDATE = 'SWITCH_UPDATE';
const LOADING = 'LOADING';

const formReducer = (state,action) =>{
    switch(action.type){
        case AUTH_INPUT_UPDATE:
            return {...state,[action.inputFieldName]: action.authText}
        case SWITCH_UPDATE:
            return {
                ...state,
                email: null,
                password: null,
                isLoginMode: !state.isLoginMode
            }
        case LOADING:
            return {
                ...state,
                isAuthentication: !state.isAuthentication
            }
        default:
            return state
    }
}

const initialState = {
    email: null,
    password: null,
    isLoginMode: true,
    isAuthentication: false
}
const AuthScreen = props =>{

    const dispatch = useDispatch();
    const [formState,formStateDispatch] = useReducer(formReducer,initialState);

    const authInputHandler = (inputFieldName,text) =>{
        formStateDispatch({
            type: AUTH_INPUT_UPDATE,
            inputFieldName: inputFieldName,
            authText: text
        })
    }

    const loginSignupButtonHandler = async () =>{
        try{
            formStateDispatch({type: LOADING});
            if(formState.isLoginMode) 
             {
                 await dispatch(authActions.Login(formState.email,formState.password));
                 props.navigation.dispatch(
                     StackActions.replace('ProductsOverView')
                 )
             }
            else await dispatch(authActions.Signup(formState.email,formState.password));
            formStateDispatch({type: LOADING});

        }catch(err){
            formStateDispatch({type: LOADING});
            Alert.alert(
                'Error Found!',
                 err.message,
                [{
                    text: 'Okay',
                    style: 'destructive'
                }]
            )
        }
    }

    const switchButtonHandler = () =>{
        formStateDispatch({
            type: SWITCH_UPDATE
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
                      formValidation = {true}
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
                      formValidation = {true}
                      titleHandler = {authInputHandler.bind(this,'password')}
                    />
                    <View style={styles.buttonContainer}>
                    {formState.isAuthentication ? (<ActivityIndicator size='small' color={Color.primary} />) :
                    (<Button
                    title = {formState.isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    color = {Color.primary}
                    onPress={loginSignupButtonHandler}
                    />)

                    }
                    </View>

                    <View style={styles.buttonContainer}>
                   <Button
                    title = {`Switch to ${formState.isLoginMode ? 'SIGNUP' : 'LOGIN'}`}
                    color = {Color.accent}
                    onPress={switchButtonHandler}
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