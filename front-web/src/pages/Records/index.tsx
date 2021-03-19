import React from 'react';
import './styles.css';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from './Pagination';


type Props = {
  recordsResponse?: RecordsResponse;
  activePage: number;
  handlePageChange: (page: number)=>void;
  loading?: boolean;
}

const Records = ({ recordsResponse, handlePageChange, activePage, loading }: Props) => {
  return (
    <>
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
      {!loading && 
        <Pagination
          activePage={activePage}
          goToPage={handlePageChange}
          totalPages={recordsResponse?.totalPages}
        />      
      }
    </>
  );
}

export default Records;