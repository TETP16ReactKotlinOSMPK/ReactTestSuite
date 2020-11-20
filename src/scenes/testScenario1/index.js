import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import {RNCamera} from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
//import Sound from 'react-native-sound';
var Sound = require('react-native-sound');

// API key
const apiKey = '0a39e670ebc117a265e000dd2f5ef474';

// bluetooth
let btAdress = 'A0:C5:89:14:12:8D';

import RNBluetoothClassic, {
  BluetoothEventType,
} from 'react-native-bluetooth-classic';

// values to insert into database
let areaValue;
let weatherValue;
let latitudeValue;
let longitudeValue;

const TestScenario1Screen = () => (
  <View style={styles.container}>
    <RNCamera
      ref={(ref) => {
        this.camera = ref;
        startAudioPlayback();
        startBl();
      }}
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.off}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      onGoogleVisionBarcodesDetected={({barcodes}) => {
        console.log(barcodes);
      }}
    />
    <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
      <TouchableOpacity
        onPress={this.takePicture.bind(this)}
        style={styles.capture}>
        <Text style={{fontSize: 14}}> SNAP </Text>
      </TouchableOpacity>
    </View>
  </View>
);

takePicture = async () => {
  if (this.camera) {
    // Get gps location
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 1500,
    })
      .then((location) => {
        console.log(location);
        latitudeValue = location.latitude;
        longitudeValue = location.longitude;
        // get weather from coordinates async
        getWeatherFromApiAsync(location);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });

    // Take picture
    const options = {quality: 0.5, base64: true};
    const data = await this.camera.takePictureAsync(options);
    firestore()
      .collection('photos')
      .add({
        area: areaValue,
        latitude: latitudeValue,
        longitude: longitudeValue,
        photo: data.uri,
        weather: weatherValue,
      })
      .then(() => {
        console.log('Photo added!');
      })
      .catch((error) => console.log(error));

    console.log(data.uri);
  }
};

function startAudioPlayback() {
  Sound.setCategory('Playback');
  var mp3File = new Sound('song.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('sound loaded successfully');

    mp3File.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed');
      }
    });
  });
}

async function startBl() {
  try {
    let paired = await RNBluetoothClassic.getBondedDevices();
    console.log(paired);

    let connected = false;

    while (!connected) {
      console.log('trying to connect...');
      let connection = await RNBluetoothClassic.connectToDevice(btAdress, {});
      console.log(connection);
      connected = await RNBluetoothClassic.isDeviceConnected(btAdress);
    }
    console.log('connected');
    while (connected) {
      let msg = await RNBluetoothClassic.writeToDevice(btAdress, 'hello world');
    }
  } catch (err) {
    console.log(err);
  }
}

const getWeatherFromApiAsync = async (location) => {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}`,
    );
    let json = await response.json();
    const weatherArray = json.weather;
    const weather = weatherArray[0].main;
    const city = json.name;
    console.log(weather);
    console.log(city);
    areaValue = city;
    weatherValue = weather;
  } catch (error) {
    console.error(error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default TestScenario1Screen;
