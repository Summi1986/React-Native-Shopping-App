import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import COLORS from '../../constants/color';
import * as CartActions from '../../store/actions/cart';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';

const ProductDetails = ({ navigation }) => {
    const productId = navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    const { imageUrl, price, description } = selectedProduct;

    const dispatch = useDispatch();

    const addToCart = () => {
      dispatch(CartActions.addToCart(selectedProduct));
    };

    return <ScrollView>
        <Image source={{
            uri: imageUrl
        }} style={styles.image} />
        <View style={styles.details}>
            <Button title='Add to Cart' color={COLORS.PRIMARY}/>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    </ScrollView>
};

const styles = StyleSheet.create({
    image: {
        height: Dimensions.get('window').height * .4,
        width: '100%'
    },
    details: {
        alignItems: 'center',
        marginVertical: 20
    },
    price: {
        fontSize: 22,
        marginVertical: 20,
        color: '#888',
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        margin: 20, 
        fontFamily: 'open-sans-bold'
    }
})

ProductDetails.navigationOptions = ({ navigation }) => {
    const productTitle = navigation.getParam('productTitle');
    return {
        headerTitle: productTitle
    }
};

export default ProductDetails;