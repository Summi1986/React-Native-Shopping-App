export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, cartAmount) => {
    return {
        items: cartItems,
        orderAmount: cartAmount,
        type: ADD_ORDER
    }
};