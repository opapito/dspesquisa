import React, { useEffect, useState } from 'react';
import Filters from '../../components/Filters';
import './styles.css';
import { barOptions, pieOptions } from './chart-options';
import Chart from 'react-apexcharts';
import axios from 'axios';
import {buildBarSeries, getPlatformChartData, getGenderChartData} from './helpers';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: orange;
`;


type PieChartData = {
  labels: string[];
  series: number[]
}

type BarChartData = {
  x: string;
  y: number;
}

const initialPieData = {
  labels:[],
  series:[]
}

const API_URL = process.env.REACT_APP_API_URL;

const Charts = () => {
  // creating three states for each graph
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
  const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
  const [genderData, setGenderData] = useState<PieChartData>(initialPieData);
  // React hook -> the first component is the variable, the second it the function to update the first variable (it is possible to use any name for variable and function)
  const [loading, setLoading] = useState<boolean>();
  const [color, setColor] = useState<string>();


  useEffect(()=>{
    setLoading(true);
    setColor("#e07243");
      async function getData(){
        const recordsResponse = await axios.get(`${API_URL}/records`);
        const gamesResponse = await axios.get(`${API_URL}/games`);
        
        const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
        setBarChartData(barData);

        const platformChartData = getPlatformChartData(recordsResponse.data.content);
        setPlatformData(platformChartData);
        
        const genderChartData = getGenderChartData(recordsResponse.data.content);
        setGenderData(genderChartData);
        setLoading(false);
      }
      getData();
}, [])

  return (
    <div className="page-container">
      <Filters link="/records" linkText="SEE TABLE" />
      {loading 
      ?
      <div className="sweet-loading">
        <BounceLoader color={color} css={override} loading={loading} />
      </div>
      :
      <div className="chart-container">
        <div className="top-related">
          <h1 className="top-related-title">
            Most voted
          </h1>
          <div className="games-container">
            <Chart
              options={barOptions}
              type="bar"
              width="900"
              height="650"
              series={[{ data: barChartData }]}
            />
          </div>
        </div>
        <div className="charts">
          <div className="platform-chart">
            <h2 className="chart-title"> Platforms</h2>
            <Chart
              options={{...pieOptions, labels: platformData?.labels}}
              type="donut"
              series={platformData?.series}
              width="350"
            />
          </div>
          <div className="gender-chart">
            <h2 className="chart-title"> Genres </h2>
            <Chart
              options={{...pieOptions, labels: genderData?.labels}}
              type="donut"
              series={genderData?.series}
              width="350"
            />

          </div>
        </div>
      </div>
      }
    </div>
  )
};

export default Charts;
