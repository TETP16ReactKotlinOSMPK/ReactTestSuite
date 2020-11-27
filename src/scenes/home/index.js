import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {BleManager} from 'react-native-ble-plx';

// class bl {
//   constructor() {
//     this.manager = new BleManager();
//   }
// }

// const blManager = new bl();

// device.name === 'ACTON II'

const HomeScreen = ({navigation}) => (
  <SafeAreaView>
    <Text style={styles.sectionTitle}>Screen : Home</Text>

    <TouchableHighlight onPress={() => navigation.navigate('TestScenario1')}>
      <Text style={styles.sectionDescription}>Go to test scenario 1</Text>
    </TouchableHighlight>
  </SafeAreaView>
);

scanAndConnect();

function scanAndConnect() {
  const manager = new BleManager();
  console.log('function working');
  manager.startDeviceScan(null, null, (error, device) => {
    console.log('scanning..');
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.log(error);
      return;
    }
    console.log(device.name);
    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    if (device.name === 'ACTON II') {
      // Stop scanning as it's not necessary if you are scanning for one device.
      console.log('found device');
      manager.stopDeviceScan();

      device
        .connect()
        .then((device) => {
          console.log('connected');
          console.log(device);
          return device.discoverAllServicesAndCharacteristics();
        })
        .then((device) => {
          // Do work on device with services and characteristics
          return device.characteristicsForService();
        })
        .catch((error) => {
          // Handle errors
          console.log(error);
        });
      // Proceed with connection.
    }
  });
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
