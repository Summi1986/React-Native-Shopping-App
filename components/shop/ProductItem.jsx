import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

const ProductItem = ({ product, onSelect, children }) => {
    const { title, imageUrl, price } = product;
    const TouchableComp = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <View style={styles.product}>
            <TouchableComp onPress={onSelect} useForeground style={styles.toucableContainer}>
                <View>
                    <Image source={{
                        uri: imageUrl
                    }} style={styles.image} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                    <View style={styles.actions}>
                       {children}
                    </View>
                </View>
            </TouchableComp>
        </View>
    )
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOffset: 0.3,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#FFFFFF',
        height: 300,
        margin: 15
    },
    toucableContainer: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    details: {
        alignItems: 'center',
        height: '20%',
        padding: 10
    },
    image: {
        height: '60%',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden'
    },
    title: {
        fontSize: 16,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans-bold'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        paddingHorizontal: 20
    }
});

export default ProductItem;