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
import Card from '../UI/Card';

const ProductItem = props =>{
    let TouchableComponent = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.product} >
            <View style={styles.touchable}>
        
            <TouchableComponent onPress= {props.onSelect} useForeground>
            <View style={{height:300}}>

            <View style={styles.imageContainer}>
               <Image style={styles.imageStyle} source={{uri:props.image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.textStyle}>{props.title}</Text>
                <Text  style={styles.textStyle}>${props.price.toFixed(2)}</Text>
            </View>

            <View style={styles.buttonContainer} >
                {props.children}
            </View>

            </View>
           </TouchableComponent>
           </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product:{
        height: 300,
        margin: 20,
    },
    imageStyle:{
        height: "100%",
        width: "100%",
    },
    imageContainer:{
        height: "60%",
        width: "100%",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
    },
    buttonContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: "45%",
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