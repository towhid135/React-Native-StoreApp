import React,{useLayoutEffect,useCallback,useReducer, useState, useEffect} from 'react';
import {View,Text,StyleSheet,TextInput,ScrollView, Alert} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/productsAction';
import Input from '../../components/UI/Input';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ActivityIndicator } from 'react-native-paper';
import Color from '../../constants/Color';

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
    var [isLoading,setIsLoading] = useState(false);
    var [isError,setIsError] = useState();
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

    useEffect(()=>{
        if(isError){
        Alert.alert(
            'Error Alert',
             isError,
             [
                 {
                     text: 'Ok',
                     style: 'destructive'
                 }
             ]
            )
        }
    },[isError])

    const submitHandler = useCallback(async () =>{
        if(!formState.formIsValid){
            Alert.alert('Wrong Input','Please enter correct input',[
                {text:'Okay',style:'destructive'}
            ])
            return
        }
        try{
            setIsError(null);
            setIsLoading(true)
            if(selectedProductId){
                //if edit mode
                await dispatch(productsActions.updateProduct(
                    selectedProductId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                ))
                setIsLoading(false);
            }
            else{
                //add mode
                await dispatch(productsActions.createProduct(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price,
                ))
                setIsLoading(false);
            }
            props.navigation.goBack();
        }
        catch(err) {
            setIsError(err.message);
        }
    },[
        dispatch,
        selectedProductId,
        formState.inputValues.title,
        formState.inputValues.imageUrl,
        formState.inputValues.description,
        formState.inputValues.price,
        formState.inputValidity.formIsValid
    ]
        )

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

    if(isLoading){
        return(
        <View style = {styles.spinnerContainer} >
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
        )
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
    spinnerContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default EditProductScreen;