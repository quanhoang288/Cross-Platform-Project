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
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.title}>{title}</Text>
          <Icon
            name="calendar"
            type="antdesign"
            onPress={handlePress}
            color="rgb(51, 51, 255)"
            containerStyle={{marginRight: 10}}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => handleConfirm(date)}
            onCancel={hideDatePicker}
          />
        </View>
          <View style={{alignItems: "center"}}>
            <Text style={styles.content}>{content}</Text>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgb(255, 255, 255)',
        marginHorizontal: 10, 
        marginBottom: 16
    },
    title:{
        justifyContent: "center",
        fontSize: 20, 
        fontWeight: "bold",
    },
    view:{
      flexDirection:"row", 
      justifyContent: "space-between"
    },
    content:{
        fontSize: 28,
        fontWeight: '700',
        fontWeight:"300"
    },
})

DatePicker.propTypes = {
    
};

export default DatePicker;