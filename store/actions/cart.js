export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product) => {
    return {
        product,
        type: ADD_TO_CART
    }
}

export const removeFromCart = (productId) => {
    return {
        productId,
        type: REMOVE_FROM_CART
    }
}