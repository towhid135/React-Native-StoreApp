import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ProductsReducer from './store/reducers/productsReducer';
import productsReducer from './store/reducers/productsReducer';
import ShopNavigator from './navigator/ShopNavigator';
const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

export default function App() {

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
