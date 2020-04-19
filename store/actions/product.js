import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-shopping-list-509e1.firebaseio.com/products.json');

            if(!response.ok){
                throw new Error('Something went wrong. Please try after sometime.')
            }
    
            const responseData = await response.json();
    
            const loadedProducts = [];
    
             for(productId in responseData){
                 const {title, imageUrl, description, price} = responseData[productId];
                loadedProducts.push(new Product(productId , 'u1', title, imageUrl, description, price))
             }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            })
        } catch(err) {
            throw new Error('Something went wrong. Please try after sometime.')
        }
       
    }
}

export const deleteProduct = (productId) => {
    return {
        productId,
        type: DELETE_PRODUCT
    }
}

export const createProduct = (product) => {
    const {id, ...restProductInfo} = product;

    return async dispatch => {
        const response = await fetch('https://rn-shopping-list-509e1.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...restProductInfo})
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            product: {...restProductInfo, productId: responseData.name}
        })
    }
}

export const editProduct = (product) => {
    return {
        product,
        type: EDIT_PRODUCT
    }
}