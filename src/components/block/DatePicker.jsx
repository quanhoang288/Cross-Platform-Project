import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet } from 'react-native';
import {ListItem, Text, Icon } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = (props) => {

    const {
        title,
        content,
        handlePress,
        isDatePickerVisible,
        handleConfirm,
        hideDatePicker
    } = props;

    return(

        <ListItem style={styles.container}>
            <ListItem.Content >
                <ListItem.Title >
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Icon
                        name="calendar"
                        type="antdesign"
                        onPress={handlePress}
                        color="rgb(51, 51, 255)"
                    />
                </ListItem.Title>
                <View>
                    <Text style={styles.content}>
                        {content}
                    </Text>
                </View>
                
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => handleConfirm(date)}
                    onCancel={hideDatePicker}
                />
            </ListItem.Content>
		</ListItem>
    );
};

const styles = StyleSheet.create({
    container:{
    },
    title:{
        fontSize: 20, 
        fontWeight:'500'
    },
    content:{
        marginTop: 8,
        fontSize: 17,
        fontWeight:"300"
    },
})

DatePicker.propTypes = {
    
};

export default DatePicker;