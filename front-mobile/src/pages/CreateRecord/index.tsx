import React, { useState, useEffect } from 'react';
import  { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCards';
import { GamePlatform, Game } from '../Types';
import RNPickerSelect from 'react-native-picker-select';
// *See https://github.com/lawnstarter/react-native-picker-select
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const placeholder = {
  label:'Select the game',
  value: null
}

const BASE_URL = 'http://192.168.1.13:8080';
//! It is not possible to use localhost with expo. It is necessary to use the same ip of the browser expo running application

/*
* In order to solve the:
 !Warning: Cannot update a component from inside the function body of a different component.
 ? Check  https://github.com/facebook/react/issues/18147#issuecomment-675488851
 For everyone on this thread, I had this issue and fixed it by following someone's suggestion of adding key to the Picker. That solved the problem for me, all is working great. I used the value from list which is unique. See below:
    <RNPickerSelect
      *key={gStuffID}
      onValueChange={value => handleSelectStuff(value)}
      placeholder={{ label: 'Select Stuff' }}
      items={gStuffList}
      style={pickerSelectStyles}
      pickerProps={styles.rnPickerProps}
      useNativeAndroidPickerStyle={false}
      *value={gStuffID}
    />
* Graph button option
  const handleOnPress = () => {
    navigation.navigate('Charts');
  }

          <View style={styles.footer}>
            <RectButton style={[styles.button, styles.buttonEnabled]} onPress={handleOnPress} >
              <Text style={styles.buttonText}>
                GRAPHS
              </Text>
            </RectButton>
          </View>

*/

const mapSelectValues = (games: Game[]) =>{
  return games.map(game => ({
    ...game,
    label: game.title,
    value: game.id
  }));
}

const CreatRecord = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>();
  const [selectedGame, setSelectedGame] = useState('');
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isEnabledBtn, setIsEnableBtn] = useState(false)
  const navigation = useNavigation();


  const handleChangePlatform = (selectedPlatform: GamePlatform) =>{
    setPlatform(selectedPlatform);
    const gamesByPlatform = allGames.filter(
      game => game.platform === selectedPlatform
    )
    setFilteredGames(gamesByPlatform);
    setIsEnableBtn((age && name && selectedGame) ? true : false);
  }

  const handleSubmit = () => {
    const payload = { name, age, gameId: selectedGame };

    axios.post(`${BASE_URL}/records`, payload)
      .then(() => {
        Toast.show({
          type: 'success', 
          position: 'top', 
          text1: 'Saved!',
          text2: 'Thank you for voting!',
          visibilityTime:500,
          autoHide: true,
          topOffset:30,
          onHide:()=>{
            setName('');
            setAge('');
            setSelectedGame('');
            setPlatform(undefined);
            navigation.navigate('Charts');  
          }
          
        });
      })
      .catch(() => {
        Toast.show(
          {
            type: 'error', 
            position: 'top', 
            text1: 'Error!',
            text2: 'Error on saving data!',
            visibilityTime:500,
            autoHide: true,
            topOffset:30,
          }
        )
      })
    }

  useEffect(()=>{
    axios.get(`${BASE_URL}/games`)
    .then(response =>{
      const selectValue = mapSelectValues(response.data);
      setAllGames(selectValue);
    })
    .catch(() => console.log('Error on listing games!'))
  },[]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder="Name" 
          placeholderTextColor="#9E9E9E"
          onChangeText={text => {
            setName(text);
            setIsEnableBtn((age && text && selectedGame) ? true : false);
          }}
          value={name}
        />
        <TextInput
           keyboardType="numeric"
           style={styles.inputText}
           placeholder="Age"
           placeholderTextColor="#9E9E9E"
           maxLength={3}
           onChangeText={text => {
             setAge(text);
             setIsEnableBtn((text && name && selectedGame) ? true : false);
            }}
           value={age}
        />
        <View style={styles.platformContainer}>
          <PlatformCard
            platform="PC"
            icon="laptop"
            onChange={handleChangePlatform}
            activePlatform={platform}
          />
          <PlatformCard
            platform="XBOX"
            icon="xbox"
            onChange={handleChangePlatform}
            activePlatform={platform}
          />
          <PlatformCard
            platform="PLAYSTATION"
            icon="playstation"
            onChange={handleChangePlatform}
            activePlatform={platform}  
          />
        </View>
          <RNPickerSelect
            key={selectedGame}
            onValueChange={value => {
              setSelectedGame(value);
              setIsEnableBtn((age && name && value) ? true : false);
            }}
            placeholder={placeholder}
            value={selectedGame}
            items={filteredGames}
            style={pickerSelectStyles}
            Icon={()=>{
              return <Icon name="chevron-down" color="#9E9E9E" size={25}/>
            }}
          />
          <View style={styles.footer}>
            <RectButton style={[styles.button, isEnabledBtn ? styles.buttonEnabled : styles.buttonDisabled]} onPress={handleSubmit} enabled={isEnabledBtn}>
              <Text style={styles.buttonText}>
                VOTE
              </Text>
            </RectButton>
          </View>
    </View>
    </>
  );

}

const pickerSelectStyles = StyleSheet.create(  
  {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      color: '#ED7947',
      paddingRight: 30,
      fontFamily: "Play_700Bold",
      height: 50
    },
    placeholder: {
      color: '#9E9E9E',
      fontSize: 16,
      fontFamily: "Play_700Bold",
    },
    iconContainer: {
      top: 10,
      right: 12,
    }
  });

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50
  },
  inputText: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonEnabled: {
    backgroundColor: '#00D4FF',
  }, 
  buttonDisabled: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  }
});


export default CreatRecord;