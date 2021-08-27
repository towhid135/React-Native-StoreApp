import React,{useLayoutEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

const CartScreen = props =>{
    const availableProducts = useSelector((state) => state.products.availableProducts);
    const selectedProductId = props.route.params.productId;
    //need to add the product id to a list for showing as a cart product
    return(<View><Text>Pid: {selectedProductId}</Text></View>);
};

const styles = StyleSheet.create({

});

export default CartScreen;