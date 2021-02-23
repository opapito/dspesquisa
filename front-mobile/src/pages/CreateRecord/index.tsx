import React, { useState, useEffect } from 'react';
import  { RectButton } from 'react-native-gesture-handler';
import { StyleSheet, View, TextInput, Text, Modal } from 'react-native';
import Header from '../../components/Header';
import PlatformCard from './PlatformCards';
import { GamePlatform, Game } from './Types';
import RNPickerSelect from 'react-native-picker-select';
// *See https://github.com/lawnstarter/react-native-picker-select
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import axios from 'axios';


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
  const [modalVisible, setModalVisible] = useState(false);
  

  const handleChangePlatform = (selectedPlatform: GamePlatform) =>{
    setPlatform(selectedPlatform);
    const gamesByPlatform = allGames.filter(
      game => game.platform === selectedPlatform
    )
    setFilteredGames(gamesByPlatform);
  }

  const handleSubmit = () => {
    const payload = { name, age, gameId: selectedGame };
    setModalVisible(true);
    
/*     axios.post(`${BASE_URL}/records`, payload)
      .then(() => {
        console.log('Success');
        setModalVisible(true);
        setName('');
        setAge('');
        setSelectedGame('');
        setPlatform(undefined); 
      })
      .catch(() => console.log('Error on saving data!'))
 */  }

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
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
           keyboardType="numeric"
           style={styles.inputText}
           placeholder="Age"
           placeholderTextColor="#9E9E9E"
           maxLength={3}
           onChangeText={text => setAge(text)}
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
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                SAVE
              </Text>
            </RectButton>
          </View>
          <View style={modalStyles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onShow={()=>
                    setTimeout(() => {
                      setModalVisible(!modalVisible)
                    }, 500)
                }
            >
              <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>
                  <Text style={styles.buttonText}> Saved!</Text> 
                        
                </View>
              </View>
            </Modal>            
          </View>
      </View>
    </>
  );

}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#5DED47',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});


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
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  }
});


export default CreatRecord;