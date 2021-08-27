import React from 'react';
import {FlatList,Text,View} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props =>{
    const products = useSelector((state) => state.products.availableProducts);
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
                onAddToCart = {() => {props.navigation.navigate({
                    name: "CartScreen",
                    params:{productId:itemData.item.id}
                })}}
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