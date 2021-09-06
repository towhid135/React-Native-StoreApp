import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const OrdersScreen = props => {
    const orders = useSelector((state) => state.orders.orders)
    return (
        <FlatList
        data = {orders}
        keyExtractor = {(item,index) => item.id}
        renderItem = {itemData => {
            return(
        <View>
            <Text>{itemData.item.totalAmount}</Text>
            <Text>{itemData.item.date}</Text>
        </View>
            )
    } }
         />
    )
}

export default OrdersScreen;