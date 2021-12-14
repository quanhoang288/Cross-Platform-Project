import Toast from 'react-native-root-toast';

const showSuccessMessage = msg => {
    Toast.show(msg, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP + 10,
        backgroundColor: '#12D687',
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

}

const showFailureMessage = msg => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 10,
        backgroundColor: '#F2353B',
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}

export { showFailureMessage, showSuccessMessage };