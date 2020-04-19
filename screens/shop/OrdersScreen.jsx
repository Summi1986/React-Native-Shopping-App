import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import OrderItem from '../../components/shop/OrderItem';
import HeaderButton from '../../components/ui/HeaderButton';

const OrderScreen = () => {
    const { orders } = useSelector(state => state.order)
    return <FlatList data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
            const {formattedDate : date} = item;
            return <OrderItem {...item} date={date}/>
        }} />

};

OrderScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title={'menu'}
                    onPress={() => navigation.toggleDrawer()}
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} />
            </HeaderButtons>
        )

    }
}

export default OrderScreen;