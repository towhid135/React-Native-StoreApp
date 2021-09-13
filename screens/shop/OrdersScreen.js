import React from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
    const orders = useSelector((state) => state.orders.orders)
    return (
        <FlatList
        data = {orders}
        keyExtractor = {(item,index) => item.id}
        renderItem = {itemData => <OrderItem 
            amount={itemData.item.totalAmount} 
            date={itemData.item.readableDate} 
            items = {itemData.item.item}
        /> }
         />
    )
}

export default OrdersScreen;