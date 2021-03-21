import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';
import axios from 'axios';
import {buildBarSeries, getPlatformChartData, getGenderChartData} from './helpers';
import { VictoryBar, VictoryPie, VictoryGroup, VictoryLabel} from 'victory-native';
import { PieChartData, BarChartData } from '../../pages/Types';
import { Bounce } from 'react-native-animated-spinkit';



const initialPieData = {
  x:"",
  y:0
}

const BASE_URL = 'http://192.168.1.13:8080';
//! It is not possible to use localhost with expo. It is necessary to use the same ip of the browser expo running application

const CenteredLabel = (props:any) => {
  const { datum, scale, data } = props;
  const centerPos = scale.y(datum._y / 2);
  const style = { fill: "white" };
  const styleUnderLabel = { fill: "white" };
  // note that because your chart is horizontal,
  // the y value that you calculate informs the x position of the label
  return (
    <>
      <VictoryLabel {...props}  x={centerPos} style={style} dx={0} />
      <VictoryLabel {...props}  text={datum.xName} textAnchor={"end"} style={styleUnderLabel} dy={25} dx={0}/>
    </>
    );
};

const Charts = () => {
    // creating three states for each graph
    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData[]>([initialPieData]);
    const [genderData, setGenderData] = useState<PieChartData[]>([initialPieData]);
    // React hook -> the first component is the variable, the second it the function to update the first variable (it is possible to use any name for variable and function)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [color, setColor] = useState<string>();
  
  
    useEffect(()=>{
      setIsLoading(true);
      setColor("#00D4FF");
        async function getData(){
          const recordsResponse = await axios.get(`${BASE_URL}/records`);
          const gamesResponse = await axios.get(`${BASE_URL}/games`);
          
          const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
          setBarChartData(barData);
  
          const platformChartData = getPlatformChartData(recordsResponse.data.content);
          setPlatformData(platformChartData);
          
          const genderChartData = getGenderChartData(recordsResponse.data.content);
          setGenderData(genderChartData);
          
          setIsLoading(false); 
        }
        getData();

  }, [])


  return (
    <>
      <Header />
       <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        {isLoading
        ?
        (
          <View style={styles.sppiner}>
            <Bounce size={45} color={color} />
          </View>
        )
        :
        (
          <>  
          <View style={styles.insideView}>
          <Text style={styles.textLogo2}>Most voted</Text>
            <VictoryGroup>
              <VictoryBar horizontal
               data={barChartData}
               labels={({ datum })=> String(Math.round(datum._y))}
               style={{                 
                 data: { fill: "#ed7947" }
                }}
            
                labelComponent={<CenteredLabel />}
                
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                  easing: "bounce"                 
                }}

              />
            </VictoryGroup>
            <Text style={styles.textLogo2}>Platforms</Text>
            <VictoryPie
              colorScale={["#a8dadc", "#ed7947", "#00D4FF", "#ffd6a5"]}
              labelRadius={48}
              data={platformData}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}

            />
            <Text style={styles.textLogo2}>Genres</Text>
            <VictoryPie
              colorScale={["#a8dadc", "#ed7947", "#00D4FF", "#ffd6a5"]}
              labelRadius={50}
              data={genderData}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />
          </View>
          </>
        )
      }
         </ScrollView>
        </SafeAreaView>
    </>
  );

}

export default Charts;

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scrollView: {
    backgroundColor:'#4c5d67'    
  },
  insideView:{
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 10,
    alignItems: 'center',
  },
  sppiner: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    borderColor:'#00D4FF',
    paddingTop:'1%',
  },
  textLogo2: {
    paddingTop:15,
    justifyContent: 'flex-start',
    fontWeight: 'bold',
    fontFamily: "Play_700Bold",
    fontSize: 18,
    color: '#FFF'
  },

});

