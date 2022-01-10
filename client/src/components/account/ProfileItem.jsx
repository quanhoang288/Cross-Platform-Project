import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ListItem, Text, Icon, Button } from 'react-native-elements';
import { View } from 'react-native';
import { height } from 'styled-system';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/reducers/modalReducer';
import { types } from '../../constants/modalTypes';
import { ASSET_API_URL } from '../../configs';

const ProfileItem = (props) => {
  const dispatch = useDispatch();

  const handleShowAdvanceModal = () => {
    dispatch(
      showModal({
        modalType: types.friendAdvance,
        propsData: {
          userId: props.userId,
          username: props.title,
          avatar: props.avatar,
        },
      }),
    );
  };

  return (
    <ListItem bottomDivider onPress={() => props.navigate(props.userId)}>
      <Avatar
        rounded
        size={48}
        source={{ uri: `${ASSET_API_URL}/${props.avatar.fileName}` }}
      >
        {/* <Avatar.Accessory
          iconProps={{ name: 'add' }}
          size={16}
          backgroundColor="#25D366"
        /> */}
      </Avatar>
      <ListItem.Content str>
        <ListItem.Title>
          <Text style={{ fontSize: 18 }}>{props.title}</Text>
        </ListItem.Title>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 12, marginTop: 8 }}>{props.comment}</Text>
          {props.displayButtonGroup && (
            <>
              <Button
                title={props.button.buttonAccept}
                titleStyle={{ fontWeight: 'normal', fontSize: 16 }}
                onPress={() => props.acceptRequest(props.button.userId, '1')}
                buttonStyle={{
                  backgroundColor: 'rgb(0, 150, 255)',
                  // borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 0,
                  padding: 4,
                  // borderRadius: 30,
                }}
                containerStyle={{
                  marginTop: 8,
                  marginBottom: 0,
                  marginRight: 8,
                  height: 28,
                  width: 80,
                  justifyContent: 'center',
                }}
              />

              <Button
                title={props.button.buttonDelete}
                titleStyle={{ fontWeight: 'normal', fontSize: 16 }}
                onPress={() => props.acceptRequest(props.button.userId, '2')}
                buttonStyle={{
                  backgroundColor: 'rgb(160, 160, 160)',
                  // borderColor: 'transparent',
                  borderWidth: 0,
                  marginTop: 0,
                  padding: 4,
                  // borderRadius: 30,
                }}
                containerStyle={{
                  marginTop: 8,
                  marginBottom: 0,
                  height: 28,
                  width: 80,
                  justifyContent: 'center',
                }}
              />
            </>
          )}
        </View>
      </ListItem.Content>
      {props.displayButtonAdvance && (
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
            onPress={handleShowAdvanceModal}
          />
        </>
      )}

      {props.displayDescription && (
        <>
          <Text>{props.time}</Text>
        </>
      )}
    </ListItem>
  );
};

ProfileItem.defaultProps = {
  displayButtonGroup: false,
  displayDescription: false,
  displayButtonAdvance: false,
};

ProfileItem.propTypes = {};

export default ProfileItem;
