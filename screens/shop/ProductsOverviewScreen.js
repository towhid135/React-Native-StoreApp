import React,{useCallback,useLayoutEffect,useEffect,useState} from 'react';
import {FlatList,Button,View,StyleSheet,ActivityIndicator,Text} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from "../../store/actions/cartAction"
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Color from '../../constants/Color';
import { Badge } from 'react-native-elements';
import { fetchProduct } from '../../store/actions/productsAction';

const ProductsOverviewScreen = props =>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(undefined);
    const products = useSelector((state) => state.products.availableProducts);
    const dispatch = useDispatch();
    //total orders
    const totalCartItem = useSelector((state) => Object.keys(state.cart.item).length );

    const loadProducts = useCallback( async () =>{
        setError(null);
        setIsLoading(true);
            try{
                await dispatch(fetchProduct());
            }
            catch(err){
                setError(err.message);
            }
            setIsLoading(false);

    },[dispatch]

    )

    //fetch data if data is changed on the server
    useEffect(() => {
        const focus = props.navigation.addListener('focus',loadProducts)

        return focus;
    },[loadProducts])

    useEffect(()=>{
        loadProducts();
    },[dispatch,loadProducts]
    )

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
        const selectHandler = () => {
            props.navigation.navigate({
            name:'ProductDetail',
            params:{productId:itemData.item.id}
        })
    }

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

    if(error){
        return(
            <View style = {styles.spinnerContainer}>
                <Text>{error}</Text>
                <Button title="Try Again" onPress={loadProducts} color={Color.primary} />
            </View>
        )
    }

    if(isLoading){
        return (
        <View style = {styles.spinnerContainer}>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
        )
    }

    else if(!isLoading && products.length < 1){
        return(
        <View style = {styles.spinnerContainer}>
            <Text style={{fontWeight:'bold'}}>No products found, please add some.</Text>
        </View>
        )
    }

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
    spinnerContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default ProductsOverviewScreen;