import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NavigationStack = createNativeStackNavigator();

const Stack = ({ screens }) => {
    return (
        <NavigationStack.Navigator>
            {screens.map((screen, idx) => (
                <NavigationStack.Screen key={idx} title={screen.title} name={screen.name} component={screen.component} options={screen.options} />
            ))}
        </NavigationStack.Navigator>
    );
};

export default Stack;