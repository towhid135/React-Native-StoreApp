import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,FlatList,ActivityIndicator} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import Color from '../../constants/Color';
import * as orderActions from '../../store/actions/ordersAction'

const OrdersScreen = props => {
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOrders = async () =>{
            setIsLoading(true);
            try{
                await dispatch(orderActions.fetchOrder());
            }catch(err){
                //console.log(err.message);
            }
            setIsLoading(false)
        }
        fetchOrders();
    },[dispatch])
    const orders = useSelector((state) => state.orders.orders)
    if(isLoading){
        return(
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
        )
    }

    if(orders.length===0){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>No orders found, please add some!</Text>
            </View>
        )
    }

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

const styles = StyleSheet.create({
    spinnerContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default OrdersScreen;