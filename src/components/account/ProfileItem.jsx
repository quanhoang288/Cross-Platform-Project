import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, Text } from 'react-native-elements';
import {View} from 'react-native';

const ProfileItem = props => {
  return (
    <ListItem bottomDivider onPress={() => {}}>
      <Avatar
        rounded
        size={40}
        source={
          {uri: 'https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/46995983_2719316961626784_3110419529126117376_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=vV7yubtliM8AX8m6PGL&_nc_ht=scontent.fhan5-8.fna&oh=c1a431bf4ff34dd400683629821d4170&oe=61920917'}
          }
      >
        <Avatar.Accessory
          iconProps={{ name: 'add' }}
          size={16}
          backgroundColor="#25D366"
        />
      </Avatar>
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

ProfileItem.propTypes = {
    
};

export default ProfileItem;