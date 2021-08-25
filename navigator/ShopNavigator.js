import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer}  from '@react-navigation/native';
import Color from '../constants/Color';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ShopNavigator = () =>{
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="ProductsOverView" 
                component={ProductsOverviewScreen}
                options={{
                    title:"Products",
                    headerStyle: {
                        backgroundColor: Color.primary,
                    },
                    headerTitleStyle:{
                        fontSize: 20,
                    },
                    headerTintColor: 'white'
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default ShopNavigator;