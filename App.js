import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';


import cartReducers from './store/reducers/cart';
import OrderReducers from './store/reducers/order';
import productReducer from './store/reducers/product';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducers = combineReducers({
  cart: cartReducers,
  order: OrderReducers,
  products: productReducer
});

const loadFonts = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

const store = createStore(rootReducers, applyMiddleware(reduxThunk));

export default function App() {
  const [apploadingState, setAppLoadingState] = useState(true);

  if(apploadingState){
    return <AppLoading startAsync={loadFonts} 
    onError={err => console.log(err)}
    onFinish={() => {setAppLoadingState(false)}} />
  }

  return (
    <Provider store={store}>
      <ShopNavigator/>
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
