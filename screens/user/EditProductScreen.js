import React,{useLayoutEffect,useCallback,useReducer} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView, Alert} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/productsAction';
import Input from '../../components/UI/Input';

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
            <Input 
              inputType = 'title'
              value={formState.inputValues.title}
              titleHandler={titleChangeHandler.bind(this,'title')}
              formValidation={formState.inputValidity.title}
              textinputProps = {{
                keyboardType: 'default',
                autoCapitalize:'sentences',
                autoCompleteType:'name',
                returnKeyType:'next',

              }}

            />
            <Input 
              inputType = 'Image url'
              value={formState.inputValues.imageUrl}
              titleHandler={titleChangeHandler.bind(this,'imageUrl')}
              formValidation={formState.inputValidity.imageUrl}
              textinputProps={
                {returnKeyType:'next'}
              }

            />
            { !selectedProductId && <Input 
              inputType = 'Price'
              value={formState.inputValues.price}
              titleHandler={titleChangeHandler.bind(this,'price')}
              formValidation={formState.inputValidity.price}
              textInputProps={{
                keyboardType:'decimal-pad',
                returnKeyType:'next'

              }}

            />
            }
            <Input 
              inputType = 'Description'
              value={formState.inputValues.description}
              titleHandler={titleChangeHandler.bind(this,'description')}
              formValidation={formState.inputValidity.description}
              textInputProps={{
                multiline: true,
                textAlignVertical:'top',
                returnKeyType:'done'
              }}

            />
            
          </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form:{
        margin: 20,
    },
})

export default EditProductScreen;