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
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontWeight: '400'
      }}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
      text2Style={{
        fontSize: 20,
        fontWeight: 'bold'
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
