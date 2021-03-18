import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  link: string;
  linkText: string;
  mountFilter?: (stDate: string, endDate: string)=>void;
}

const Filters = ({ link, linkText, mountFilter}: Props) => {
    const [startDate, setStartDate]   = useState('');
    const [endDate, setEndDate]   = useState('');

    useEffect(() => {
      if (mountFilter){
        mountFilter(startDate, endDate);
      }      
    }, [startDate, endDate, mountFilter])

    const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
    };
    
    const handleChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndDate(e.target.value);
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
      <div className="filters-container records-actions"> 
        {link !== "/records" && (
        <>
          <input
            type="text"
            id="startDate"
            placeholder="Start date"
            onFocus={(e) => e.target.type = 'date'} 
            onBlur={(e) =>{
              if(e.target.value){
                e.target.type = 'date';
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
              } 
             }}
            onChange={handleChangeEndDate}
          
          />
          <button className="clean-filters" onClick={handleClearBtn}> CLEAR </button>
        </>
          )
        }   
        <Link to={link}>
          <button className="action-filters">
            {linkText}
        </button>
        </Link>
      </div>
    )
}

export default Filters;
