import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '_scenes/home'
import TestScenario1Screen from '_scenes/testScenario1';

const AuthNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Home: {
        screen:HomeScreen
    },
    TestScenario1: {
        screen:TestScenario1Screen
    },
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;