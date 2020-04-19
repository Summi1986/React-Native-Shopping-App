import PRODUCTS from '../../data/dummy-data';
import {
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    EDIT_PRODUCT,
    SET_PRODUCTS
} from '../actions/product';
import Product from '../../models/product';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products,
                    userProducts: action.products.filter(product => product.ownerId === 'u1')
            }
            case DELETE_PRODUCT:
                return {
                    ...state,
                    userProducts: state.userProducts.filter(product => product.id !== action.productId),
                        availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
                }
                case CREATE_PRODUCT:
                    const {
                        title, description, imageUrl, price
                    } = action.product;
                    const newProduct = new Product(Date.now().toString(), 'u1', title, imageUrl, description, +price);
                    return {
                        ...state,
                        availableProducts: [...state.availableProducts, newProduct],
                            userProducts: [...state.userProducts, newProduct]
                    }
                    case EDIT_PRODUCT:
                        const productIndex = state.userProducts.findIndex(product => product.id === action.product.productId);
                        if (productIndex < 0) {
                            return state;
                        }
                        let updateUserProducts = [...state.userProducts];
                        let updatedAvailableProducts = [...state.availableProducts];
                        const editedProduct = state.userProducts[productIndex];
                        const {
                            title: editedTitle, description: editedDescription, imageUrl: editedImageUrl
                        } = action.product;
                        const updatedProduct = new Product(editedProduct.id, editedProduct.ownerId, editedTitle, editedImageUrl, editedDescription, editedProduct.price);
                        updateUserProducts[productIndex] = updatedProduct;
                        updatedAvailableProducts[productIndex] = updatedProduct;
                        return {
                            ...state,
                            userProducts: updateUserProducts,
                                availableProducts: updatedAvailableProducts
                        }

    }
    return state;
}