import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import COLORS from '../../constants/color';

const OrderItem = ({ amount, items, date }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button color={COLORS.PRIMARY} title={`${showDetails ? 'hide details' : 'show details'}`} onPress={() => setShowDetails(prevState => !prevState)} />
            <View style={styles.detailsContainer}>
                {showDetails && items.map(item => <CartItem {...item} />)}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOffset: 0.3,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#FFFFFF',
        margin: 20,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center'
    },
    detailsContainer: {
        alignItems : 'flex-start'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    }
});

export default OrderItem;
