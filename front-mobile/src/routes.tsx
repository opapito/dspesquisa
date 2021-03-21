import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();
import Home from './pages/Home';
import CreateRecord from './pages/CreateRecord';
import Charts from './pages/Charts';

const Routes = () => {
  return (
    <NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle:{
            backgroundColor:'#0B1F34'
        }}}
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CreateRecord" component={CreateRecord}/>
        <Stack.Screen name="Charts" component={Charts}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;
