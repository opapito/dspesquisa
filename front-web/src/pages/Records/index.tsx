import React, { useEffect, useState } from 'react';
import './styles.css';
import { RecordsResponse } from './types';
import axios from 'axios';
import { formatDate } from './helpers';
import Pagination from './Pagination';
import Filters from '../../components/Filters';

const BASE_URL = 'http://localhost:8080';

const Records = () => {

  // Internal state, useState -> React Hooks 
  const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
  const [activePage, setActivePage] = useState(0);

  // React Hooks
  useEffect(() => {

    axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
      .then(response => setRecordsResponse(response.data));

  }, [activePage]); // every time activePage changes, the axios will make a request

  const handlePageChange = (index: number) => {
    setActivePage(index)
  }


  return (
    <div className="page-container">
      <Filters link="/charts" linkText="SEE GRAPHS" />
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
          {recordsResponse?.content.map(record => (
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
            <Pagination
              activePage={activePage}
              goToPage={handlePageChange}
              totalPages={recordsResponse?.totalPages}

            />
    </div>
  );
}

export default Records;