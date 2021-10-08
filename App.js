import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { InputText, FunctionalityItem } from './src/components/block';
import { registerRootComponent } from 'expo'; 

const App = () => {
  const [text, setText] = useState('default text');
  
  return (
    <View style={styles.container}>
      <InputText 
        label="Test Label" 
        labelStyle={styles.label}
        inputStyle={styles.input}
      />
      <FunctionalityItem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 20,
  },
  input: {
    height: 40,
    width: "60%",
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
