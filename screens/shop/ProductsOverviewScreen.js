import React,{useLayoutEffect} from 'react';
import {FlatList,Button,View,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from "../../store/actions/cartAction"
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Color from '../../constants/Color';
import { Badge } from 'react-native-elements';

const ProductsOverviewScreen = props =>{
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();

    //total orders
    const totalCartItem = useSelector((state) => Object.keys(state.cart.item).length );

    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => {
                return(
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Badge value= {totalCartItem} 
                        status="success"  
                        containerStyle={{ position: 'absolute', top: -4, right: 3 }} 
                        />

                        <Item
                         title="cart"
                         iconName = 'ios-cart'
                         iconSize = {30} 
                         color = "white"
                         onPress = {()=> props.navigation.navigate("CartScreen") }
                        />
                    </HeaderButtons>
                )
            },
            headerLeft: () => {
                return(
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                         title="menu"
                         iconName = 'ios-menu'
                         iconSize = {30} 
                         color = "white"
                         onPress = {()=> props.navigation.toggleDrawer() }
                        />
                    </HeaderButtons>
                )
            }
        })
    })
    const renderProductItem = itemData =>{
        const selectHandler = () => {props.navigation.navigate({
            name:'ProductDetail',
            params:{productId:itemData.item.id}
        })}
        return (
            <ProductItem 
                image={itemData.item.imageUrl} 
                title = {itemData.item.title}
                price = {itemData.item.price}
                onSelect = {selectHandler}
                onAddToCart = {() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            >
            <View style={styles.buttonStyle} >
                <Button color={Color.primary} title="VIEW DETAILS" onPress={selectHandler} />
            </View>
            <View style={styles.buttonStyle} >
                <Button color={Color.primary} title="ADD TO CART" onPress={() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }} />  
            </View>
    
            </ProductItem>
            );
    };
    return (
    <FlatList
    data={products}
    keyExtractor = {item => item.id}
    renderItem = {renderProductItem}
    />
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        marginTop: 10,
        width: "40%",
        padding: 10,
    },
})

export default ProductsOverviewScreen;