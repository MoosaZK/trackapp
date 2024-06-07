import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import SplashScreen from './src/screen/splash';
import Home from './src/screen/home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SummaryScreen from './src/screen/summary';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TakePicture from './src/screen/takepicture';
import Profile from './src/screen/profile';
import {ProfileContextProvider} from './src/context/profilecontext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const HomeNavigator = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./src/images/directions_run_24dp.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Image
                source={require('./src/images/account_circle_24dp.png')}
                style={{width: size, height: size, tintColor: color}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return isLoading ? (
    <SplashScreen />
  ) : (
    <ProfileContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="summary"
            component={SummaryScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="TakePicture" component={TakePicture} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileContextProvider>
  );
};

export default App;
