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
      const startDate = (document.getElementById('startDate') as HTMLInputElement) ;
      const endDate = (document.getElementById('endDate') as HTMLInputElement) ;
      startDate.value = '';
      endDate.value = '';
      setStartDate('');
      setEndDate('');
    };
    return(
      <div className="filters-container records-actions"> 
        {link !== "/records" && (
        <>
          <input type="date" id="startDate"  onChange={handleChangeStartDate} required pattern="\d{2}-\d{2}-\d{4}"/>
          <input type="date" id="endDate"  onChange={handleChangeEndDate} required pattern="\d{2}-\d{2}-\d{4}" />
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
