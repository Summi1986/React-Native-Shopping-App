import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const CartItem = ({ sum, title, quantity, price, imageUrl, onRemove }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
                <Text style={styles.boldText} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                <View style={styles.imageContainer}>
                    <Image source={{
                        uri: imageUrl
                    }} style={styles.image} />
                </View>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.item}><Text style={{...styles.normalText}}>Quantity</Text><Text style={styles.boldText}>{quantity}</Text></View>
                <View style={styles.item}><Text style={styles.normalText}>Price</Text><Text style={styles.boldText}>${price}</Text></View>
                <View style={styles.item}><Text style={styles.normalText}>Total</Text><Text style={styles.boldText}>${sum.toFixed(2)}</Text></View>
                <View style={styles.item}>
                    <Text style={styles.mainText}>Delete</Text>
                    <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                        <Ionicons color="red"
                            size={23}
                            name={Platform.OS === 'andriod' ? 'md-trash' : 'ios-trash'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageContainer: {
        width: 100,
        shadowColor: 'black',
        shadowOffset: 0.3,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        borderRadius: 10,
        elevation: 5
    },
    rightContainer: {
       flex: 1,
       paddingLeft: 20
    },
    leftContainer: {
        width: 150
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    boldText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        marginBottom: 10
    },
    normalText: {
        fontFamily: 'open-sans',
        fontSize: 14,
        marginBottom: 10,
    },
    deleteButton: {
        marginLeft: 10
    }
});

export default CartItem;
