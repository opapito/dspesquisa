import React, { useEffect, useState } from 'react';
import './styles.css';
import { RecordsResponse } from './types';
import axios from 'axios';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Filters from '../../components/Filters';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { SearchFilters } from './types';



const API_URL = process.env.REACT_APP_API_URL;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: orange;
`;

const FILTER_MAP = {
  All: ()=> true,
  Dates:(a:any)=> true,
}


const Records = () => {
  
  // Internal state, useState -> React Hooks 
  const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
  const [activePage, setActivePage] = useState(0);
  const [loading, setLoading] = useState<boolean>();
  const [color, setColor] = useState<string>();
  const [filter, setFilter] = useState <SearchFilters>('All');
  
  const mountFilter = (stDate: string, endDate: string) => {
    console.log('stDate->', stDate.replace('/','-'), ' endDate->', endDate.replace('/','-'));
    if (stDate){
      FILTER_MAP.Dates = (record: any) => record.moment.substring(0,10) > stDate.replace('/','-');
      setFilter('Dates');
      
    }
    if (!stDate && !endDate){
      setFilter('All');
      
    }
  }
  // React Hooks
  useEffect(() => {
    setLoading(true);
    setColor("#e07243");
        axios.get(`${API_URL}/records?linesPerPage=12&page=${activePage}`)
          .then(response =>{
            setRecordsResponse(response.data);
            setLoading(false);
          });
  }, [activePage]); // every time activePage changes, the axios will make a request

  const handlePageChange = (index: number) => {
    setActivePage(index)
  }


  return (
    <div className="page-container">
      <Filters mountFilter={mountFilter} link="/charts" linkText="SEE GRAPHS" />
      {loading 
      ?
      <div className="sweet-loading">
        <BounceLoader color={color} css={override} loading={loading} />
      </div>
      :
      <table className="records-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>INSTANT</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>PLATFORM</th>
            <th>GENRE</th>
            <th>TITLE</th>
          </tr>
        </thead>
        <tbody>
          {recordsResponse?.content
            .filter(FILTER_MAP[filter])
            .map(record => (
            <tr key={record.id}>
              <td>
                {formatDate(record.moment)}
            </td>
              <td>
                {record.name}
            </td>
              <td>
                {record.age}
            </td>
              <td className="text-secondary">
                {record.gamePlatform}
            </td>
              <td>
                {record.genreName}
            </td>
              <td className="text-primary">
                {record.gameTitle}
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
      {!loading && 
        <Pagination
          activePage={activePage}
          goToPage={handlePageChange}
          totalPages={recordsResponse?.totalPages}
        />      
      }
    </div>
  );
}

export default Records;