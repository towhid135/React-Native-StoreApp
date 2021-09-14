import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Color from '../constants/Color';
import { NavigationContainer } from '@react-navigation/native';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ShopNavigator from './ShopNavigator';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

//inserting the Orders screen in to stack
const OrdersStackNavigator = props =>{
    var headerStyleProps = {
        headerTintColor:'white',
        headerTitleStyle:{
          fontFamily: 'titleFont',
        },
        headerStyle:{
          backgroundColor: Color.primary,
        },
       
      }
    const Stack = createStackNavigator();
    return(
    <Stack.Navigator>
        <Stack.Screen
        name = "ordersScreen"
        component = {OrdersScreen}
        options = {{title: "Your Orders",...headerStyleProps}}
         />
    </Stack.Navigator>
    );
}

//inserting the UserProductsScreen into a separate stack
const AdminNavigator = props =>{
    var headerStyleProps = {
        headerTintColor:'white',
        headerTitleStyle:{
          fontFamily: 'titleFont',
        },
        headerStyle:{
          backgroundColor: Color.primary,
        },
      }
    const Stack = createStackNavigator();
    return(
    <Stack.Navigator>
        <Stack.Screen
        name = "userProductScreen"
        component = {UserProductsScreen}
        options = {{title: "Your Products",...headerStyleProps}}
         />
         <Stack.Screen 
            name = "EditProductStackNav"
            component={EditProductScreen}
            options = {{title: "Your Products",...headerStyleProps}}
         />
    </Stack.Navigator>
    );
}




const MainNavigator = props =>{
    const Drawer = createDrawerNavigator();
    return (
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen
            name= "Home"
            component = {ShopNavigator}
            options = {{drawerIcon: ({tintColor}) => 
                (<Ionicons 
                name = "md-cart" 
                size={32} 
                color = {tintColor}
                />)
                }}
            />
            <Drawer.Screen
            name = "Orders"
            component = {OrdersStackNavigator}
            options = {{drawerIcon: drawerConfig => 
                (<Ionicons 
                name = "md-list" 
                size={32} 
                color = {drawerConfig.tintColor}
                />)
                }}
            />
            <Drawer.Screen 
              name = "Admin"
              component = {AdminNavigator}
              options = {{
                  drawerIcon: drawerConfig => {return (
                      <Ionicons 
                        name = "md-create"
                        size = {32}
                        color = {drawerConfig.tintColor}
                      />
                  )}
              }}
            />
        </Drawer.Navigator>
    </NavigationContainer>
    );
}

export default MainNavigator;