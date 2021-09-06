import React,{useLayoutEffect} from 'react';
import {FlatList,Text,View} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from "../../store/actions/cartAction"
import {HeaderButton, HeaderButtons,Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const ProductsOverviewScreen = props =>{
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => {
                return(
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
        return (
            <ProductItem 
                image={itemData.item.imageUrl} 
                title = {itemData.item.title}
                price = {itemData.item.price}
                onViewDetail = {() => {props.navigation.navigate({
                    name:'ProductDetail',
                    params:{productId:itemData.item.id}
                })}}
                onAddToCart = {() => {
                    dispatch(cartActions.addToCart(itemData.item))
                }}
            />
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

export default ProductsOverviewScreen;