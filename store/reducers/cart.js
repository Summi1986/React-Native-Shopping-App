import {
    ADD_TO_CART,
    REMOVE_FROM_CART
} from '../actions/cart';
import CartItem from '../../models/cart-item';
import {DELETE_PRODUCT} from '../actions/product';
import {
    ADD_ORDER
} from '../actions/order';

const initialState = {
    cartItems: {},
    cartAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const {
                id, price, title, imageUrl
            } = action.product;

            let cartItem;

            if (state.cartItems[id]) {
                const itemCurrentState = state.cartItems[id];
                const updatedSum = itemCurrentState.sum + itemCurrentState.price;
                const updatedQuantity = itemCurrentState.quantity + 1;
                cartItem = new CartItem(price, title, updatedQuantity, updatedSum, imageUrl);

            } else {
                cartItem = new CartItem(price, title, 1, price, imageUrl);
            }
            return {
                ...state,
                cartItems: {
                        ...state.cartItems,
                        [id]: cartItem
                    },
                    cartAmount: state.cartAmount + price
            }
            case REMOVE_FROM_CART:
                const itemCurrentState = state.cartItems[action.productId];
                const currentQuantity = itemCurrentState.quantity;
                let updatedCartItems;
                if (currentQuantity > 1) {
                    const cartItem = new CartItem(itemCurrentState.price, itemCurrentState.title, currentQuantity - 1, itemCurrentState.sum - itemCurrentState.price, itemCurrentState.imageUrl);
                    updatedCartItems = {
                        ...state.cartItems,
                        [action.productId]: cartItem
                    };
                } else {
                    updatedCartItems = {
                        ...state.cartItems
                    };
                    delete updatedCartItems[action.productId];
                }
                return {
                    ...state, cartItems: updatedCartItems, cartAmount: state.cartAmount - itemCurrentState.price
                };
            case ADD_ORDER:
                return initialState;
            case DELETE_PRODUCT:
                if(!state.cartItems[action.productId]){
                    return state;
                }
                const updateItems = {...state.cartItems};
                const cartAmount = state.cartAmount - updateItems[action.productId].sum;
                delete updateItems[action.productId];
                return {
                    ...state,
                    cartItems: updateItems,
                    cartAmount
                }
            default:
                return state;
    }
    return state;
}