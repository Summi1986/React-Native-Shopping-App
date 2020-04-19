import React, { useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import InputWithLabel from '../../components/ui/Input';
import HeaderButton from '../../components/ui/HeaderButton';
import * as productActions from '../../store/actions/product';

const ACTIONS = {
    UPDATE: "UPDATE"
};

const formReducer = (state, action) => {
    if (action.type === ACTIONS.UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedInputValidations = {
            ...state.inputValidations,
            [action.input]: action.isValid
        }

        let formValidation = true;

        for (let inputKey in updatedInputValidations) {
            if (!updatedInputValidations[inputKey]) {
                formValidation = false
            }
        }

        return {
            ...state,
            inputValues: updatedValues,
            inputValidations: updatedInputValidations,
            formValidation
        }
    }

};

const EditProductScreen = ({ navigation }) => {
    const productId = navigation.getParam('productId');
    const { userProducts } = useSelector(state => state.products);
    const editedProduct = userProducts.find(product => product.id === productId);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: editedProduct ? editedProduct.price : '',
            description: editedProduct ? editedProduct.description : '',
        },
        inputValidations: {
            title: !!editedProduct,
            imageUrl: !!editedProduct,
            price: !!editedProduct,
            description: !!editedProduct,
        },
        formValidation: !!editedProduct
    })

    const dispatch = useDispatch();

    const { inputValues, inputValidations, formValidation } = formState;

    const inputChangeHandler = useCallback((inputIdentifier, value, isValid) => {

        dispatchFormState({
            type: ACTIONS.UPDATE,
            value,
            isValid,
            input: inputIdentifier
        });
    }, [dispatchFormState])

    const submitHandler = useCallback(() => {
        if (!formValidation) {
            Alert.alert('Error', 'Please check the information provided', [
                {
                    text: 'OK',
                    style: 'destructive'
                }
            ])
            return;
        }

        const payload = {
            productId,
            ...inputValues
        };
        dispatch(productId ? productActions.editProduct(payload) : productActions.createProduct(payload));
        navigation.goBack();
    }, [productId, dispatch, formState]);


    useEffect(() => {
        navigation.setParams({
            submitHandler
        })
    }, [submitHandler]);



    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>

                    <InputWithLabel label='Title'
                        id='title'
                        value={inputValues.title}
                        changeHandler={inputChangeHandler}
                        autoCapitalize='sentences'
                        autoCorrect
                        required={true}
                        validation={inputValidations.title}
                        errorText='Title should not be empty!' />

                    <InputWithLabel label='Image Url'
                        id='imageUrl'
                        value={inputValues.imageUrl}
                        changeHandler={inputChangeHandler}
                        required={true}
                        validation={inputValidations.imageUrl}
                        errorText='Image url should not be empty!' />

                    {
                        !editedProduct ? <InputWithLabel label='Price'
                            id='price'
                            value={inputValues.price}
                            changeHandler={inputChangeHandler}
                            required={!editedProduct}
                            validation={inputValidations.price}
                            keyboardType='decimal-pad'
                            min={0.1}
                            errorText='Price should not be empty!' /> : null
                    }

                    <InputWithLabel label='Description'
                        id='description'
                        value={inputValues.description}
                        changeHandler={inputChangeHandler}
                        autoCapitalize='sentences'
                        autoCorrect
                        multiLine
                        required={true}
                        numberOfLines={3}
                        minLength={5}
                        validation={inputValidations.description}
                        errorText='Description should not be empty!' />

                </View>
            </ScrollView >
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    }
});

EditProductScreen.navigationOptions = ({ navigation }) => {
    const productId = navigation.getParam('productId');
    const submitHandler = navigation.getParam('submitHandler');
    return {
        headerTitle: productId ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='save'
                    onPress={submitHandler}
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} />
            </HeaderButtons>
        )
    }
}

export default EditProductScreen;