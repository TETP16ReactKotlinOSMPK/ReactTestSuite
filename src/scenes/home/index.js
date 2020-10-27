import React from 'react';
import {SafeAreaView, Text, TouchableHighlight} from 'react-native';

const HomeScreen = ({navigation}) => (
    <SafeAreaView>
        <Text>Screen : Home</Text>

        <TouchableHighlight onPress={() => navigation.navigate('TestScenario1')}>
            <Text>Go to test scenario 1</Text>
        </TouchableHighlight>
    </SafeAreaView>
);

export default HomeScreen;