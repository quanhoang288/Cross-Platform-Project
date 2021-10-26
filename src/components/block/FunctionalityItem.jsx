import React from 'react';
import PropTypes from 'prop-types';
import {View } from 'react-native';
import {ListItem, Text, Icon } from 'react-native-elements';

const FunctionalityItem = props => {
	return (
		<ListItem bottomDivider onPress={props.onPress}>
			<Icon
				name={props.icon.name}
				type={props.icon.type}
				size={32}
			/>
			<ListItem.Content>
				<ListItem.Title>
					<Text style={{fontSize:20, fontWeight:'500'}}>
						{props.content}
					</Text>
				</ListItem.Title>
				<View style={{ flexDirection: 'row' }}>
					<Text style={{fontSize:13}}>
						{props.note}
					</Text>
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