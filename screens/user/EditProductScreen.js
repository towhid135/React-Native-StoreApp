import React,{useLayoutEffect,useState,useCallback,useEffect} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/productsAction';


const EditProductScreen = props => {
    var selectedProductId;
    var selectedProduct;
    const dispatch = useDispatch();
    if(props.route.params.productId){
        selectedProductId = props.route.params.productId;
        selectedProduct = useSelector((state) => {
        return state.products.availableProducts.find((prod) => prod.id === selectedProductId)
        })
    }
    const [title,setTitle] = useState(selectedProductId ? selectedProduct.title : '');
    const [imageUrl,setImageUrl] = useState(selectedProductId ? selectedProduct.imageUrl: '');
    const [price,setPrice] = useState('');
    const [description,setDescription] = useState(selectedProductId ? selectedProduct.description:'');
    


    useLayoutEffect( () => {
        const submitFun = props.route.params.submit;
        props.navigation.setOptions({
        title: selectedProductId ? 'Edit '+selectedProduct.title : "Add Item",
        headerRight: () => {return(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                <Item
                 name="addOrEdit"
                 iconName="md-save"
                 iconSize={32}
                 onPress={submitHandler}
                 color="white"
                 />
            </HeaderButtons>
        )}


        })
    })

    const submitHandler = useCallback(() =>{
        if(selectedProductId){
            //if edit mode
            dispatch(productsActions.updateProduct(
                selectedProductId,
                title,
                description,
                imageUrl,
            ))
        }
        else{
            //add mode
            dispatch(productsActions.createProduct(
                title,
                description,
                imageUrl,
                +price,
            ))
        }
        props.navigation.goBack();
    },[dispatch,selectedProductId,title,imageUrl,description,price])


    return (
        <ScrollView>
          <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput value={title} style={styles.input} onChangeText={(Updatedtext) => setTitle(Updatedtext)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput value={imageUrl} style={styles.input} onChangeText={(updatedUrl) => setImageUrl(updatedUrl)} />
                </View>
                {selectedProductId ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput value={price} style={styles.input} onChangeText={(updatedPrice) => setPrice(updatedPrice)} />
                </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput value={description} style={styles.input} onChangeText={(updatedDes) => setDescription(updatedDes)} />
                </View>
          </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form:{
        margin: 20,
    },
    formControl:{
        width: "100%"
    },
    label:{
        fontFamily: 'titleFont',
        marginVertical: 8,

    },
    input:{
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5,
        fontFamily: 'textFont',
    },
})

export default EditProductScreen;