import React,{useLayoutEffect} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import { useSelector } from 'react-redux';
import Color from '../../constants/Color';


const CartScreen = props =>{
    const availableProducts = useSelector((state) => state.cart);
    //const selectedProductId = props.route.params.productId;
    //need to add the product id to a list for showing as a cart product
    return(
    <View style={styles.screen}>
        <View style= {styles.summary}>
            <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>${availableProducts.totalAmount.toFixed(2)}</Text>
            </Text>
           <View>
            <Button color={Color.accent} title="Order Now" onPress={()=>{}} />
          </View>
            
        </View>
        
        <View>
            <Text>CART ITEMS</Text>
        </View>
    </View>
    );
    
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0,height:2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
    },
    summaryText:{
        fontFamily: 'textFont',
        fontSize: 18,
    },
    amount:{
        color: Color.primary,
    }
});

export default CartScreen;