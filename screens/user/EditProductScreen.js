import React,{useLayoutEffect,useCallback,useReducer} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView, Alert} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/productsAction';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state,action) =>{
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValue = {
            ...state.inputValues,
            [action.input]: action.value,
        }
        const updatedValidity = {
            ...state.inputValidity,
            [action.input]: action.isValid,
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidity){
            updatedFormIsValid = updatedFormIsValid && updatedValidity[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidity: updatedValidity,
            inputValues: updatedValue,
        }
    }
    return state;
}


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
    
    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            title: selectedProductId ? selectedProduct.title : '',
            imageUrl: selectedProductId ? selectedProduct.imageUrl: '',
            description: selectedProductId ? selectedProduct.description:'',
            price: ''
        },
        inputValidity:{
            title: selectedProductId ? true : false,
            imageUrl: selectedProductId ? true : false,
            description: selectedProductId ? true : false,
            price: selectedProductId ? true : false,
        },
        formIsValid: selectedProductId ? true : false
    })


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
        if(!formState.formIsValid){
            Alert.alert('Wrong Input','Please enter correct input',[
                {text:'Okay',style:'destructive'}
            ])
            return
        }
        if(selectedProductId){
            //if edit mode
            dispatch(productsActions.updateProduct(
                selectedProductId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
            ))
        }
        else{
            //add mode
            dispatch(productsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price,
            ))
        }
        props.navigation.goBack();
    },[
        dispatch,
        selectedProductId,
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description,
        formState.inputValues.price,
        formState.inputValidity.formIsValid])

    const titleChangeHandler = (inputIdentifier,text) =>{
        let isValid = false;
        if(text.trim().length > 0){
            isValid = true
        }
        else{
           
        }
        dispatchFormState(
            {
            type:FORM_INPUT_UPDATE,
            value: text,
            isValid:isValid,
            input: inputIdentifier,
        });
    }

    return (
        <ScrollView>
          <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                    keyboardType='default'  
                    value={formState.inputValues.title} style={styles.input} 
                    onChangeText={titleChangeHandler.bind(this,'title')} 
                    autoCapitalize='sentences'
                    autoCorrect
                    autoCompleteType='name'
                    returnKeyType='next'
                    />
                    {!formState.inputValidity.formIsValid && <View> 
                        <Text >Please enter a valid title!</Text>
                        </View>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput 
                    value={formState.inputValues.imageUrl} 
                    style={styles.input} 
                    onChangeText={titleChangeHandler.bind(this,'imageUrl')} 
                    returnKeyType='next'
                    />
                </View>
                {selectedProductId ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                    keyboardType='decimal-pad' 
                    value={formState.inputValues.price} style={styles.input} 
                    onChangeText={titleChangeHandler.bind(this,'price')} 
                    returnKeyType='next'
                    />
                </View>
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                    value={formState.inputValues.description} 
                    style={styles.input} 
                    onChangeText={titleChangeHandler.bind(this,'description')} 
                    multiline={true}
                    textAlignVertical='top'
                    returnKeyType='done'
                    />
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