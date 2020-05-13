import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screens from '/Users/manish.jindal/Desktop/codeforces-react-native/CodeforcesApp/Screens';

export default function App() {
  return (
    <View style={styles.container}>
      <Screens/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
});
