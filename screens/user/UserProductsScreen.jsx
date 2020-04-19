import React from 'react';
import { FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import COLORS from '../../constants/color';
import HeaderButton from '../../components/ui/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as ProductActions from '../../store/actions/product';

const UserProductScreen = ({ navigation }) => {

    const { userProducts } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const editProductHandler = ({ id }) => {
        navigation.navigate({
            routeName: 'editProduct',
            params: {
                productId: id
            }
        })
    }

    const deleteProductHandler = ({ id }) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?',
            [
                {
                    text: 'No', style: 'cancel'
                },
                {
                    text: 'Yes', style: 'destructive', onPress: ()  => dispatch(ProductActions.deleteProduct(id))

                }
            ]);
          
    }

    const onSelect = ({ id, title }) => {
        navigation.navigate({
            routeName: 'ProductDetails',
            params: {
                productId: id,
                productTitle: title
            }
        });
    }

    return (
        <FlatList data={userProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ProductItem product={item} onSelect={() => onSelect(item)}>
                <Button title='Edit' color={COLORS.PRIMARY} product={item} onPress={() => editProductHandler(item)} />
                <Button title='Delete' color={COLORS.PRIMARY} product={item} onPress={() => deleteProductHandler(item)} />
            </ProductItem>} />
    )
}

UserProductScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu'
                    onPress={() => navigation.toggleDrawer()}
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu'
                    onPress={() => navigation.navigate({
                        routeName: 'editProduct'
                    })}
                    iconName={Platform.OS === 'android' ? 'md-add-circle-outline' : 'ios-add-circle-outline'} />
            </HeaderButtons>
        )
    }
}

export default UserProductScreen;