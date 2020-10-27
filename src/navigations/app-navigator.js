import {createBottomTabNavigator} from 'react-navigation-tabs';

import TestScenario1 from '_scenes/testScenario1';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home:{
    screen:TestScenario1,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;

