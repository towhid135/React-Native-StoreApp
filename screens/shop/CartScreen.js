import React,{useLayoutEffect} from 'react';
import {View,Text,StyleSheet,Button, FlatList} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import Color from '../../constants/Color';
import CartItem from '../../components/shop/CartItem';
import { deleteFromCart } from '../../store/actions/cartAction';
import * as orderActions from '../../store/actions/ordersAction'

const CartScreen = props =>{
    const availableProducts = useSelector((state) => state.cart);

    const cartItems = useSelector((state) => {
        const transformedCartItem = [];
        for (const key in availableProducts.item){
            transformedCartItem.push({
                productId: key,
                productTitle: state.cart.item[key].productTitle,
                productPrice: state.cart.item[key].productPrice,
                quantity: state.cart.item[key].quantity,
                sum: state.cart.item[key].sum

            });
        }
            return transformedCartItem.sort((a,b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();
    //const selectedProductId = props.route.params.productId;
    //need to add the product id to a list for showing as a cart product
    return(
    <View style={styles.screen}>
        <View style= {styles.summary}>
            <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>${Math.round(availableProducts.totalAmount.toFixed(2)*100)/100}</Text>
            </Text>
           <View>
            <Button 
            color={Color.accent} 
            title="Order Now" 
            disabled={cartItems.length === 0}  
            onPress={()=> dispatch(orderActions.addOrder(cartItems,availableProducts.totalAmount)) } 

            />
          </View>
            
        </View>
        
        <View>
            <FlatList
            data = {cartItems}
            keyExtractor = {(item,index) => item.productId}
            renderItem = {
                (itemData) => <CartItem 
                deleteAble = {true}
                quantity = {itemData.item.quantity} 
                title = {itemData.item.productTitle}
                amount = {itemData.item.quantity * itemData.item.productPrice}
                onRemove = {() => dispatch(deleteFromCart(itemData.item.productId))}
                />
            }
             />
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