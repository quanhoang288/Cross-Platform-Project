import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FunctionalityItem = props => {
    return (
        <TouchableOpacity onPress={() => {console.log("Pressed")}}>
            <View>
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
                <Text>Functionality Item</Text>
            </View>
        </TouchableOpacity>
    );
};

FunctionalityItem.propTypes = {
    
};

export default FunctionalityItem;