import React, { useState } from 'react';
import {View,Text,StyleSheet,Button,FlatList} from 'react-native';
import Color from '../../constants/Color';
import Order from '../../models/Order';
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails,setShowDetails] = useState(false);
    return(
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Color.primary} title= {showDetails ? "Hide Details" : "Show Details"} onPress={() => {
                setShowDetails(prevState => !prevState)
            } 
            }/>

            {showDetails && (<View style={styles.cartItem}>
                {props.items.map((item) => <CartItem 
                    key = {item.productId}
                    deleteAble = {false}
                    quantity = {item.quantity}
                    title = {item.productTitle}
                    amount = {item.sum}  
                    />)}
            </View>)}

        </View>
    );
}

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0,height:2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems:'center',
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        margin: 10,
    },
    amount: {
        fontFamily: "textFont",
        fontSize: 16
    },
    date: {
        fontFamily: "textFont",
        fontSize: 16,
        color: '#888'
    },
    cartItem:{
        width: "100%",
    }
});

export default OrderItem;