import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ProductsReducer from './store/reducers/productsReducer';
import productsReducer from './store/reducers/productsReducer';
import ShopNavigator from './navigator/ShopNavigator';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import cartReducer from './store/reducers/cartReducer';
//import {composeWithDevTools} from 'redux-devtools-extension';

const fetchFonts = () => {
  return Font.loadAsync({
    'titleFont': require("./assets/fonts/title/HoltwoodOneSC-Regular.ttf"),
    'textFont': require("./assets/fonts/text/BalooTamma2-Regular.ttf"),
  })
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

//const store = createStore(rootReducer,composeWithDevTools());
const store = createStore(rootReducer);


export default function App() {
  [fontFlag,setFontFlag] = useState(false);

  if(!fontFlag){
    return <AppLoading 
       startAsync = {fetchFonts}
       onFinish = { () => setFontFlag(true)}
       onError = {(err) => console.log(err)}
    />;
  }

  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
