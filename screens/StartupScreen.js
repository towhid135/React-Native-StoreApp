import React,{useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,ActivityIndicator,StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from "../constants/Color";
import { Authentication,AUTHENTICATE } from "../store/actions/authAction";

const StartupScreen = props =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin = async () =>{
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                props.navigation.navigate('authScreen');
                return;
            }

            const transformedData = JSON.parse(userData);
            //console.log('userData in startscreen',transformedData);
            //checking whether the token has expired or not
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('authNavScreen');
                return;
            }

            dispatch(Authentication({
                type: AUTHENTICATE,
                token: token,
                userId: userId
            }))
            props.navigation.navigate('ProductsOverView')



        }
        tryLogin();
    },[dispatch])

    return (
    <View style={StyleSheet.screen}>
        <ActivityIndicator size="large" color={Color.primary} />
    </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen;