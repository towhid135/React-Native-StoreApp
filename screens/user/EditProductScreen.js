import React,{useLayoutEffect} from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import {useSelector} from 'react-redux';


const EditProductScreen = props => {
    
    let selectedProductId;
    let selectedProductTitle
    if(props.route.params.productId){
        selectedProductId = props.route.params.productId;
        selectedProductTitle = useSelector((state) => {
        return state.products.availableProducts.find((prod) => prod.id === selectedProductId)
        })
    }
    


    useLayoutEffect( () => {
        props.navigation.setOptions({
        title: selectedProductId ? 'Edit '+selectedProductTitle.title : "Add Item",


        })
    })
    return (
        <View><Text>Your Edit Screen</Text></View>
    );
}

const styles = StyleSheet.create({

})

export default EditProductScreen;