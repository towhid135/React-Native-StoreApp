import React,{useLayoutEffect} from 'react';
import { FlatList,StyleSheet,View,Button } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Color from '../../constants/Color';
import { deleteFromCart } from '../../store/actions/cartAction';
import { deleteProduct } from '../../store/actions/productsAction';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

 const UserProductsScreen = props =>{
    //Menu button was added to the OrdersNavigator.js
    const editProductHandler = (Pid) =>{
        props.navigation.navigate({
            name:'EditProductStackNav',
            params:{productId: Pid}
        })
    }
    useLayoutEffect(() =>{
        props.navigation.setOptions({
            headerLeft: () => 
            { 
              return ( <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
              <Item 
                title = "menu2"
                iconName="ios-menu"
                iconSize={32}
                color = "white"
                onPress = {() => props.navigation.toggleDrawer()}
              />
          </HeaderButtons>
                  )
           },

            headerRight: () => {return (
                (<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                    <Item 
                        title = 'create'
                        iconName = 'md-create'
                        iconSize = {32}
                        color= 'white'
                        onPress={() => editProductHandler()}
                    />
            
                </HeaderButtons>)
            )}
    
    
        })
    })


    const dispatch = useDispatch();
    const userProducts = useSelector((state) => state.products.userProducts)
    return (
        <FlatList 
        data = {userProducts}
        keyExtractor = {(item,index) => item.id}
        renderItem = {(itemData) => 
            {return(
                <ProductItem 
                 image = {itemData.item.imageUrl}
                 title = {itemData.item.title}
                 price = {itemData.item.price}
                 onSelect = {editProductHandler.bind(this,itemData.item.id)}
                >
                <View style={styles.buttonStyle} >
                <Button color={Color.primary} title="Edit" onPress={() => editProductHandler(itemData.item.id) } />
                </View>
                <View style={styles.buttonStyle} >
                <Button color={Color.primary} title="Delete" onPress={()=> {
                    dispatch(deleteProduct(itemData.item.id))
                }} />  
                </View>
                </ProductItem>
            )}
        }
        />
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        marginTop: 10,
        width: "30%",
        padding: 10,
    },
})

export default UserProductsScreen;