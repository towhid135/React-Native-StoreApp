import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,Button,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import Color from '../../constants/Color';

const ProductItem = props =>{
    let TouchableComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.product} >
            <View style={styles.touchable}>
        
            <TouchableComponent onPress= {props.onViewDetail} useForeground>
            <View style={{height:300}}>

            <View style={styles.imageContainer}>
               <Image style={styles.imageStyle} source={{uri:props.image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.textStyle}>{props.title}</Text>
                <Text  style={styles.textStyle}>${props.price.toFixed(2)}</Text>
            </View>

            <View style={styles.buttonContainer} >
                <View style={styles.buttonStyle} >
                   <Button color={Color.primary} title="VIEW DETAILS" onPress={props.onViewDetail} />
                </View>
                <View style={styles.buttonStyle} >
                   <Button color={Color.primary} title="ADD TO CART" onPress={props.onAddToCart} />  
                </View>
            </View>

            </View>
           </TouchableComponent>
           </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0,height:2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    imageStyle:{
        height: "100%",
        width: "100%",
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "25%",
    },
    buttonStyle:{
        marginTop: 10,
        width: "40%",
        padding: 10,
    },
    titleStyle:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceStyle:{
        color: Color.darkGray,
    },
    details:{
        alignItems: 'center',
        height: "15%",
        padding: 10,
    },
    imageContainer:{
        height: "60%",
        width: "100%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
    },
    touchable:{
        borderRadius: 10,
        overflow: "hidden",
    },
    textStyle:{
        fontFamily: 'textFont',
        fontSize: 15,
    }
});

export default ProductItem;