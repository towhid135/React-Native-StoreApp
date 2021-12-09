import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import { ShopDrawerNavigator } from "./OrdersNavigator";
import { useSelector } from "react-redux";
import { AuthNavigator } from "./ShopNavigator";
import StartupScreen from "../screens/StartupScreen";

export const AppNavigator = props =>{
    /* "!!" operator converts the token value into boolean value */
    const isAuth = useSelector((state) => !!state.auth.token);
    const flag = useSelector((state) => state.auth.flag);
    console.log('isAuth,flag',isAuth,flag);
    return(
        <NavigationContainer>
            {isAuth && <ShopDrawerNavigator />}
            {!isAuth && flag && <AuthNavigator/>}
            {!isAuth && !flag && <StartupScreen/>}

        </NavigationContainer>
    )
}