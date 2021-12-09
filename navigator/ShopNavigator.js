import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Color from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

export const AuthNavigator = () =>{
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='authNavScreen' 
            component={AuthScreen} 
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}

const ShopNavigator = () =>{
    const Stack = createStackNavigator();

    var navigationOptions = {
        headerStyle: {
            backgroundColor: Color.primary,
        },
        headerTitleStyle:{
            fontSize: 18,
            fontFamily: 'titleFont'
        },
        headerTintColor: 'white'
    }
    return (
        
            <Stack.Navigator >
                <Stack.Screen 
                name="ProductsOverView" 
                component={ProductsOverviewScreen}
                options={{title:"Products",...navigationOptions}}
                />

                <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{...navigationOptions}}
                />
 
                <Stack.Screen
                name = "CartScreen"
                component = {CartScreen}
                options = {{title:"Cart",...navigationOptions}}
                />
            </Stack.Navigator>
    );
}

export default ShopNavigator;