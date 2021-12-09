import React,{useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View,ActivityIndicator,StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Color from "../constants/Color";
import { Authentication,AUTHENTICATE } from "../store/actions/authAction";
import { StackActions } from "@react-navigation/native";
import { setTheFlag } from "../store/actions/authAction";

const StartupScreen = props =>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin = async () =>{
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                dispatch(setTheFlag());
                return;
            }

            const transformedData = JSON.parse(userData);
            //console.log('userData in startscreen',transformedData);
            //checking whether the token has expired or not
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token || !userId){
                dispatch(setTheFlag());
                return;
            }
            //console.log('startscreen: token,userId,expiryDate',token,userId,expiryDate);
            const expirationTime = expirationDate.getTime() - new Date().getTime();
            dispatch(Authentication(token,userId,expirationTime));

        }
        tryLogin();
    },[dispatch])

    return (
    <View style={styles.screen}>
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