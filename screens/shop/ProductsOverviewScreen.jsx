import React, { useEffect, useState } from 'react';
import { FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '../../constants/color';
import * as cartActions from '../../store/actions/cart';
import ProductItem from '../../components/shop/ProductItem';
import HeaderButton from '../../components/ui/HeaderButton';
import * as productActions from '../../store/actions/product';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const ProductOveriewScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const availableProducts = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const onAddToCart = (product) => {
        dispatch(cartActions.addToCart(product));
    };

    const onViewProductDetails = ({ id, title }) => {
        navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productId: id,
                productTitle: title
            }
        });
    };

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const products = await dispatch(productActions.fetchProducts());
            setError(false);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);

    }

    useEffect(() => {

        loadProducts();

    }, [dispatch]);

    if (isLoading) {
        return <View style={styles.center}>
            <ActivityIndicator size='large' color={COLORS.PRIMARY} />
        </View>
    }

    if (!isLoading && (availableProducts.length === 0)) {
        return <View style={styles.center}>
            <Text>No Product Found. Please start adding some product</Text>
        </View>
    }

    if (!isLoading && !!error) {
        return <View style={styles.center}>
            <Text>{error}</Text>
            <View style={{ marginTop: 10 }} >
                <Button title='Try Again' color={COLORS.PRIMARY} onPress={loadProducts} />
            </View>
        </View>
    }

    return (
        <FlatList data={availableProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <ProductItem product={item}
                    onAddToCart={() => onAddToCart(item)}
                    onSelect={() => onViewProductDetails(item)}>
                    <Button title='View Details' color={COLORS.PRIMARY} onPress={() => onViewProductDetails(item)} />
                    <Button title='Add to Cart' color={COLORS.PRIMARY} onPress={() => onAddToCart(item)} />
                </ProductItem>
            )}
        />
    )
};

ProductOveriewScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title={'cart'}
                    onPress={() => {
                        navigation.navigate('CartDetails')
                    }}
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title={'menu'}
                    onPress={() => navigation.toggleDrawer()}
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'open-sans-bold'
    }
})

export default ProductOveriewScreen