import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer}  from '@react-navigation/native';
import Color from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen';

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
        <NavigationContainer>
            <Stack.Navigator>
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
        </NavigationContainer>
    );
}

export default ShopNavigator;