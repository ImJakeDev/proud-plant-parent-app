import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import Button from '../components/Button'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Proud Plant Parent 🪴</Text>
      <View style={styles.separator} lightColor="#e1e1e1" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}/>
      <EditScreenInfo path="/screens/HomeScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: '80%',
  },
});
