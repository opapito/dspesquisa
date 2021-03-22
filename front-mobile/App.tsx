import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import  AppLoading  from 'expo-app-loading';
import {
  useFonts,
  Play_400Regular,
  Play_700Bold
} from '@expo-google-fonts/play';

import Routes from './src/routes';
import Toast, { BaseToast } from 'react-native-toast-message';

const toastConfig = {
  success: ({ ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'green' }}
    
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 20,
        fontWeight: 'bold'
      }}
      text1NumberOfLines={1}
      leadingIcon={require('./src/assets/success.png')}
      leadingIconStyle={{
        width: 30,
        height:30
      }}
      text2NumberOfLines={1}
      text2Style={{
        fontSize: 20,
        fontWeight: 'normal'
      }}
      
    />
  ),

  error: ({...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      text1Style={{
        fontSize: 20,
        fontWeight: 'bold'
      }}
      text1NumberOfLines={1}
      leadingIcon={require('./src/assets/error.png')}
      leadingIconStyle={{
        width: 30,
        height:30
      }}
      text2NumberOfLines={1}
      text2Style={{
        fontSize: 20,
        fontWeight: 'normal'
      }}
 
    />
  )
};

export default function App() {
    const [fontsLoaded] = useFonts({
      Play_400Regular,
      Play_700Bold    
    });

    if (!fontsLoaded){
      return <AppLoading />
    } else {
      return (
      <>
        <View style={styles.container}>
          <Routes />
          <StatusBar style="auto" />
        </View>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
       </>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
