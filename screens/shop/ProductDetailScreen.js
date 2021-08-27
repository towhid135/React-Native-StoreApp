import React,{useLayoutEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailScreen = props =>{
    const availableProducts = useSelector((state) => state.products.availableProducts);
    const selectedProductId = props.route.params.productId;
    const selectedProduct = availableProducts.find((product) => selectedProductId === product.id);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: selectedProduct.title,
        })
    })

    return(<View><Text>{selectedProduct.title}</Text></View>);
}

const styles = StyleSheet.create({

});

export default ProductDetailScreen;