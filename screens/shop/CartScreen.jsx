import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import COLORS from '../../constants/color';
import CartItem from '../../components/shop/CartItem';
import * as CartActions from '../../store/actions/cart';
import * as OrderActions from '../../store/actions/order';

const CartDetails = () => {

    const { cartAmount, cartItems } = useSelector(state => state.cart);
    const updatedCartItems = getUpdatedCartItems(cartItems);

    const dispatch = useDispatch();

    const removeFromCart = (productId) => {
        dispatch(CartActions.removeFromCart(productId));
    }

    const addOrder = () => {
        dispatch(OrderActions.addOrder(updatedCartItems, cartAmount));
    }

    return <View style={styles.screen}>
        <View style={styles.summary}>
            <Text style={styles.summaryText}>
                Total : <Text style={styles.amount}>
                    ${Math.round(cartAmount.toFixed(2) * 100) /100}
                </Text>
            </Text>
            <Button title='Order Now' color={COLORS.SECONDARY} disabled={!updatedCartItems.length} onPress={addOrder}/>
        </View>
        <FlatList data={updatedCartItems}
            keyExtractor={item => item.productId} 
            renderItem ={({item}) => <CartItem {...item} onRemove={() => removeFromCart(item.productId)}/>}/>
    </View>
};

const getUpdatedCartItems = (cartItems) => {
    const updatedCartItems = [];
    for (var itemIndex in cartItems) {
        updatedCartItems.push({
            productId: itemIndex,
            ...cartItems[itemIndex]
        })
    }
    return updatedCartItems.sort((p1, p2) => p1.productId - p2.productId ? 1 : -1);
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#ccc',
        shadowOffset: 0.3,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 10,
        elevation: 5,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: COLORS.SECONDARY
    }
});

CartDetails.navigationOptions = {
    headerTitle : 'Cart Details'
}

export default CartDetails;