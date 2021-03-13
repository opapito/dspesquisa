import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Header from '../../components/Header';
import axios from 'axios';
import {buildBarSeries, getPlatformChartData, getGenderChartData} from './helpers';
import { VictoryBar, VictoryAxis, VictoryChart, VictoryPie, VictoryTheme } from 'victory-native';
import { PieChartData, BarChartData } from '../../pages/Types'



const initialPieData = {
  x:"",
  y:0
}

const BASE_URL = 'http://192.168.1.13:8080';
//! It is not possible to use localhost with expo. It is necessary to use the same ip of the browser expo running application


const Charts = () => {
    // creating three states for each graph
    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData[]>([initialPieData]);
    const [genderData, setGenderData] = useState<PieChartData[]>([initialPieData]);
    // React hook -> the first component is the variable, the second it the function to update the first variable (it is possible to use any name for variable and function)
    const [loading, setLoading] = useState<boolean>();
    const [color, setColor] = useState<string>();
  
  
    useEffect(()=>{
      setLoading(true);
      setColor("#e07243");
        async function getData(){
          const recordsResponse = await axios.get(`${BASE_URL}/records`);
          const gamesResponse = await axios.get(`${BASE_URL}/games`);
          
          const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
          setBarChartData(barData);
  
          const platformChartData = getPlatformChartData(recordsResponse.data.content);
          setPlatformData(platformChartData);
          
          const genderChartData = getGenderChartData(recordsResponse.data.content);
          setGenderData(genderChartData);
          
        }
        getData();
  }, [])

  const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

  return (
    <>
      <Header />
        <View style={styles.container}>
          <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
          <VictoryPie
              colorScale={["#a8dadc", "#ed7947", "#00D4FF", "#ffd6a5"]}
              //theme={VictoryTheme.material}
              innerRadius={68} labelRadius={80}
            data={platformData}
          />
          <VictoryPie
              colorScale={["#a8dadc", "#ed7947", "#00D4FF", "#ffd6a5"]}
              //theme={VictoryTheme.material}
              innerRadius={68} labelRadius={80}
            data={genderData}
          />
        </View>
    </>
  );

}

export default Charts;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50,
    alignItems: 'center',
  }
});

