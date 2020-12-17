import React from 'react';
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

const apiKey = '0a39e670ebc117a265e000dd2f5ef474';

const TestScenario1Screen = ({navigation}) => (
  <View style={styles.container}>
    <RNCamera
      ref={(ref) => {
        this.camera = ref;
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
        <Text style={{fontSize: 14}}> TAKE PHOTO </Text>
      </TouchableOpacity>
    </View>
  </View>
);

takePicture = async () => {
  if (this.camera) {
    // Get gps location
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        // get weather from coordinates
        getWeatherFromApiAsync(location);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });

    // Take picture
    const options = {quality: 0.5, base64: true};
    const data = await this.camera.takePictureAsync(options);

    console.log(data.uri);
  }
};

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
