import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import Color from '../constants/Color';
import { NavigationContainer } from '@react-navigation/native';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ShopNavigator from './ShopNavigator';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux';
import { Logout } from '../store/actions/authAction';

const LogoutContent = props =>{
  const dispatch = useDispatch();

  const logoutButtonHandler = () =>{
    console.log('ordersNavigator: going to navigation');
    dispatch(Logout());
    
  }

  let logOutbutton = (
      <View style={{flex: 1}}>
        <View style={styles.logoutView}>
        <Button 
        title="Logout" 
        onPress={logoutButtonHandler} 
        color= {Color.blue}
        />
        </View>
      </View>
  )
  return (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
      <DrawerItem
        label= {() => logOutbutton}
      />
  </DrawerContentScrollView>
  )
}


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
        options = {{
          title: "Your Orders",...headerStyleProps,
          headerLeft: () => 
            { 
              return ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
              <Item 
                title = "menu2"
                iconName="ios-menu"
                iconSize={32}
                color = "white"
                onPress = {() => props.navigation.toggleDrawer()}
              />
          </HeaderButtons>
                  )
           }
      }
    }
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


export const ShopDrawerNavigator = props =>{
  const Drawer = createDrawerNavigator();
  return(
    <Drawer.Navigator
          drawerContent = {props => <LogoutContent {...props} />}
          drawerContentOptions = {{activeTintColor: Color.primary}}
        >
            <Drawer.Screen
            name= "Home"
            component = {ShopNavigator}
            options={{
              drawerIcon: props => (
                <Ionicons
                  name='md-cart'
                  size={32}
                  color={props.color}
                />
              )
            }}
          />
            <Drawer.Screen
            name = "Orders"
            component = {OrdersStackNavigator}
            options = {{drawerIcon: props => 
                (<Ionicons 
                name = "md-list" 
                size={32} 
                color = {props.color}
                />)
                }}
            />
            <Drawer.Screen 
              name = "Admin"
              component = {AdminNavigator}
              options = {{
                  drawerIcon: props => (
                      <Ionicons 
                        name = "md-create"
                        size = {32}
                        color = {props.color}
                      />
                  )
              }}
            />
        </Drawer.Navigator>
  )
}


const styles = StyleSheet.create({
  logoutView:{
    flex:1,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    left: 65,
    marginTop: 20
    
  }
})