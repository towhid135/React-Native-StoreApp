import React,{useLayoutEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,Image,Button} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../../constants/Color';

const ProductDetailScreen = props =>{
    const availableProducts = useSelector((state) => state.products.availableProducts);
    const selectedProductId = props.route.params.productId;
    const selectedProduct = availableProducts.find((product) => selectedProductId === product.id);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            title: selectedProduct.title,
        })
    })

    return (
    <ScrollView style={styles.ScrollViewStyle}>
    <View style={styles.container}>
      <Image style={styles.imgStyle} source={{uri:selectedProduct.imageUrl}} />
      <View style={styles.buttonContainer}>
          <Button 
          title="ADD TO CART" 
          onPress={() => {}} 
          color= {Color.primary}
          />
      </View>
      <View>
          <Text style={styles.priceText}>${selectedProduct.price}</Text>
      </View>
      <View>
          <Text style={styles.descriptionText}>{selectedProduct.description}</Text>
      </View>
    </View>
    </ScrollView>
    );
    
}

const styles = StyleSheet.create({
   ScrollViewStyle:{
       flex:1,
       width:"100%",
   },
   imgStyle:{
       height:300,
       width:"100%",
   },
   container:{
       flex:1,
       justifyContent:'center',
       alignItems: 'center',
   },
   buttonContainer:{
       padding: 10,
       width: "35%",
   },
   priceText:{
       color: Color.darkGray,
       fontFamily: 'textFont',
       fontSize: 20,
   },
   descriptionText:{
       fontFamily: 'textFont',
       fontSize: 15,
       marginHorizontal: 20,
       textAlign:'center',
   }
});

export default ProductDetailScreen;