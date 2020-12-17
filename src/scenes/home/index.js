import React from 'react';
import {SafeAreaView, Text, TouchableHighlight, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => (
  <SafeAreaView style={styles.container}>
    <TouchableHighlight
      onPress={() => navigation.navigate('TestScenario1')}
      style={styles.button}>
      <Text style={{fontSize: 14}}>Go to test scenario 1</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default HomeScreen;
