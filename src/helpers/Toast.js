import Toast from 'react-native-root-toast';

const showSucessMessage = msg => {
    const toast = Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 10,
        backgroundColor: '#12D687',
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

    setTimeout(() => {
        Toast.hide(toast);
      }, 2000);
}

const showFailureMessage = msg => {
    const toast = Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP + 10,
        backgroundColor: '#F2353B',
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

    setTimeout(() => {
        Toast.hide(toast);
    }, 3000);
}

export { showFailureMessage, showSucessMessage };