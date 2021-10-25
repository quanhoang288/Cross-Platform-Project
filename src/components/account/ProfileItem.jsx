import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, Text, Icon, Button } from 'react-native-elements';
import {View} from 'react-native';
import { height } from 'styled-system';

const ProfileItem = props => {
  return (
    <ListItem bottomDivider onPress={() => {}}>
      <Avatar
        rounded
        size={48}
        source={{uri: props.avatar.source}}
      >
        {/* <Avatar.Accessory
          iconProps={{ name: 'add' }}
          size={16}
          backgroundColor="#25D366"
        /> */}
      </Avatar>
      <ListItem.Content str  >
        <ListItem.Title>
          <Text style={{fontSize:16}}  >{props.title}</Text>
        </ListItem.Title>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{fontSize:12, marginTop:8 }}  >{props.comment}</Text>
          {props.displayButtonGroup &&  
            <>
              <Button
                title={props.button.buttonAccept}
                titleStyle={{ fontWeight: 'normal', fontSize:16 }}
                buttonStyle={{
                  backgroundColor: 'rgb(0, 150, 255)',
                  // borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 0,
                  // borderRadius: 30,
                }}
                containerStyle={{
                  marginTop:8,
                  marginBottom:0,
                  marginRight:8,
                  height: 28,
                  width:80,
                  justifyContent:'center'
                }}
              />

              <Button
                title={props.button.buttonDelete}
                titleStyle={{ fontWeight: 'normal', fontSize:16 }}
                buttonStyle={{
                  backgroundColor: 'rgb(160, 160, 160)',
                  // borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 0,
                  // borderRadius: 30,
                }}
                containerStyle={{
                  marginTop:8,
                  marginBottom:0,
                  height: 28,
                  width:80,
                  justifyContent:'center'
                }}
              />
            </>
          }
        </View>
      </ListItem.Content>
      {props.displayButtonAdvance && 
        <>
          <Button
            icon={{
              name: 'dots-three-horizontal',
              type: 'entypo',
              size: 20,
              color: 'rgba(110, 120, 170, 1)',
            }}
            buttonStyle={{
              backgroundColor: 'white',
            }}
          />
        </>
      }

      {props.displayDescription && 
        <>
          <Text>{props.time}</Text>
        </>
      }
    </ListItem>
  );
};

ProfileItem.defaultProps = {
  displayButtonGroup: false,
  displayDescription: false,
  displayButtonAdvance: false,
}

ProfileItem.propTypes = {
    
};

export default ProfileItem;