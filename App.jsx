import React, { useState, useEffect } from 'react'; // Import React first
import SplashScreen from './src/screen/splash';
import Home from './src/screen/home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SummaryScreen from './src/screen/summary';
const Stack = createStackNavigator();
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []); 
  return (
    isLoading ? <SplashScreen /> : 
    
    (<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='home' component={Home}/>
        <Stack.Screen name='summary' component={SummaryScreen}/>
      
      </Stack.Navigator>
    </NavigationContainer>)
  );
};

export default App;
