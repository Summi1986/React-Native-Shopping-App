import React from 'react';
import {
    Platform
} from 'react-native';
import {
    createAppContainer
} from 'react-navigation';
import {
    createDrawerNavigator
} from 'react-navigation-drawer'
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    Ionicons
} from '@expo/vector-icons';

import COLORS from '../constants/color';
import CartDetails from '../screens/shop/CartScreen';
import OrdersDetails from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/user/EditProduct';
import ProductDetails from '../screens/shop/ProductDetailsScreen';
import UserProductDetails from '../screens/user/UserProductsScreen'
import ProductOveriewScreen from '../screens/shop/ProductsOverviewScreen';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.PRIMARY : 'transparent'
    },
    headerTitleStyle: {
        fontSize: 16,
        fontFamily: 'open-sans-bold'
    },
    headerTitleAlign: 'center',
    headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.PRIMARY

}

const ProductsNavigator = createStackNavigator({
    ProductOveriewScreen,
    ProductDetails,
    CartDetails

}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) => <Ionicons name = {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color= {drawerConfig.tintColor}/>
    },
    defaultNavigationOptions
});

const ordersNavigator = createStackNavigator({
    orders: OrdersDetails
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) => <Ionicons name = {Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color= {drawerConfig.tintColor}/>
    },
    defaultNavigationOptions
});

const userProductsNavigator = createStackNavigator({
    userProduct: UserProductDetails,
    editProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: (drawerConfig) => <Ionicons name = {Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color= {drawerConfig.tintColor}/>
    },
    defaultNavigationOptions
});

const shopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: ordersNavigator,
    Admin: userProductsNavigator
}, {
    contentOptions: {
        activeTintColor: COLORS.PRIMARY
    }
})

export default createAppContainer(shopNavigator);