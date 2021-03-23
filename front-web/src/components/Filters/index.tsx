import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import { RecordsResponse } from '../../pages/Records/types';
import Records from '../../pages/Records'
import Charts from '../../pages/Charts';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: orange;
`;

const API_URL = process.env.REACT_APP_API_URL;

const Filters = () => {
    const [startDate, setStartDate]   = useState('');
    const [endDate, setEndDate]   = useState('');
    const [loading, setLoading] = useState<boolean>();
    const [color, setColor] = useState<string>();
    const [activePage, setActivePage] = useState(0);
    const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
    const [recordsResponseNotPg, setRecordsResponseNotPg] = useState<RecordsResponse>();
    const [showRecords, setShowRecords] = useState(true) 
  

      //* React Hooks
    useEffect(() => {
      setLoading(true);
      setColor("#e07243");
      axios.get(`${API_URL}/records?${startDate ? startDate: ''}&linesPerPage=12&page=${activePage}&orderBy=moment&direction=ASC${endDate ? '&'+endDate: ''}`)
        .then(response =>{
          setRecordsResponse(response.data);
      });
      //* Fetching data without pagination for graphs totalization based on startDate and endDate
      axios.get(`${API_URL}/records?${startDate ? startDate: ''}&orderBy=moment&direction=ASC${endDate ? '&'+endDate: ''}`)
        .then(response =>{
          setRecordsResponseNotPg(response.data);
          setLoading(false);
      });

    }, [activePage, endDate, startDate]);
    

    const handlePageChange = (page: number) =>{
      setActivePage(page);
    }

    const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value){
        setStartDate(`min=${e.target.value}T00:00:00Z`);
      } else {
        setStartDate('');
      }
    };
    
    const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value){
        setEndDate(`max=${e.target.value}T23:59:59Z`);
      }else {
        setEndDate('');
      }
    };
    
    const handleClearBtn = () => {
      const startDateBtn = (document.getElementById('startDate') as HTMLInputElement) ;
      const endDateBtn = (document.getElementById('endDate') as HTMLInputElement) ;
      startDateBtn.type='text';
      startDateBtn.value = '';
      endDateBtn.type='text';
      endDateBtn.value = '';
      setStartDate('');
      setEndDate('');
    };

    return(
      <div className="page-container">
      <div className="filters-container records-actions"> 
          <input
            type="text"
            id="startDate"
            placeholder="Start date"
            onFocus={(e) => e.target.type = 'date'} 
            onBlur={(e) =>{
              if(e.target.value){
                e.target.type = 'date';
              } else {
                e.target.type = 'text';
                e.target.placeholder ='Start date';
              }
             }
            }
            onChange={handleChangeStartDate}
          
          />
          <input type="text"
            id="endDate"
            placeholder="End date"
            onFocus={(e) => e.target.type = 'date'} 
            onBlur={(e) =>{
              if(e.target.value){
                e.target.type = 'date';
              } else {
                e.target.type = 'text';
                e.target.placeholder ='End date';
              }
             }}
            onChange={handleChangeEndDate}
          
          />
          <button className="clean-filters" onClick={handleClearBtn}> CLEAR </button>
          
        
        <button className="action-filters" onClick={()=>setShowRecords(!showRecords)}>
            {showRecords ? 'SEE GRAPHS' : 'SEE TABLE'}
        </button>
        
        </div> 
        
          {loading 
          ?
            <div className="sweet-loading">
              <BounceLoader color={color} css={override} loading={loading} />
            </div>
          :
          (
            showRecords ? 
            (
              <Records
              recordsResponse={recordsResponse}
              activePage={activePage}
              handlePageChange={handlePageChange}
              loading={loading}
              
              />
            )
            :
            (recordsResponseNotPg &&
              <Charts
                recordsResponseNotPg={recordsResponseNotPg}
              />
            )
          )
          }

        </div>
    )
}

export default Filters;
