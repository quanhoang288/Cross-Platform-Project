import React from 'react';
import PropTypes from 'prop-types';
import {View } from 'react-native';
import {ListItem, Text, Icon } from 'react-native-elements';

const FunctionalityItem = props => {
	return (
		<ListItem bottomDivider onPress={() => {}}>
			<Icon name='image' type='feather' size={32}/>
			<ListItem.Content>
				<ListItem.Title>
					<Text>My Status</Text>
				</ListItem.Title>
				<View style={{ flexDirection: 'row' }}>
					<Text>Tap to add status update</Text>
				</View>
			</ListItem.Content>
			{/* <ListItem.Accordion>
			</ListItem.Accordion> */}
		</ListItem>
	);
};

FunctionalityItem.propTypes = {
    
};

export default FunctionalityItem;