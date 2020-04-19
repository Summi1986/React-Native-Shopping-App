import React, { useReducer, useEffect, useCallback } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const ACTIONS = {
    INPUT_CHANGE: 'INPUT_CHANGE',
    INPUT_BLUR: 'INPUT_BLUR',
}

const inputReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.INPUT_BLUR:
            return {
                ...state,
                touched: action.touched,
            }
        case ACTIONS.INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        default:
            return state;
    }
    return state;
}

const InputWithLabel = ({id, label, value, validation, changeHandler, errorText, required, ...additionalInputProps}) => {
    const [inputState, dispatchInputState] = useReducer(inputReducer, {
        value: value,
        isValid: validation,
        touched: false,
    })

    const inputChangeHandler = useCallback((value) => {
        let isValid = true;
        if (required && value.trim().length === 0) {
            isValid = false;
        }
        dispatchInputState({
            type: ACTIONS.INPUT_CHANGE,
            value,
            isValid
        });
    }, [dispatchInputState]);

    const onTouchHandler =  useCallback(() => {
        dispatchInputState({
            type: ACTIONS.INPUT_BLUR,
            touched: true
        })
    }, [dispatchInputState])

    useEffect(() => {
            changeHandler(id, inputState.value, inputState.isValid);
    }, [inputState, changeHandler])

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} value={inputState.value} onChangeText={inputChangeHandler} onBlur={onTouchHandler} {...additionalInputProps}/>
            {!inputState.isValid ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 12
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    },
    error: {
        fontFamily: 'open-sans-bold',
        color: 'red'
    }
});

export default InputWithLabel;