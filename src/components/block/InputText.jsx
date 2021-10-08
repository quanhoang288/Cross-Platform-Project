import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

const InputText = ({wrapperStyle, inputStyle, labelStyle, label, placeHolderText, editable}) => {
    
    const styles = StyleSheet.create({
        wrapperStyle: wrapperStyle,
        labelStyle: labelStyle,
        inputStyle: inputStyle,
    });

    return (
        <View style={styles.wrapperStyle}>
            <Text style={styles.labelStyle}>{label}</Text>
            <TextInput 
                style={styles.inputStyle}
                placeholder={placeHolderText}
                editable={editable}
                value="Hard-coded value"
            />
        </View>
    );
};



InputText.propTypes = {
    wrapperStyle: PropTypes.object,
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    label: PropTypes.string,
    placeHolderText: PropTypes.string,
    editable: PropTypes.bool
};

InputText.defaultProps = {
    placeHolderText: '',
    editable: true,
};

export default InputText;