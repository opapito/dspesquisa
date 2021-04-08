import React from 'react';
import './styles.css';

// the "?" prevents the app crash as it returns undefined while data is still being loaded
type Props = {
    totalPages?: number;
    goToPage: Function;
    activePage: number;
};

const Pagination = ({ totalPages = 0, goToPage, activePage }: Props) => {
    const paginationItems = Array.from(Array(totalPages).keys());

    return (
        <div className="pagination-container">
            {paginationItems.map((item) => (
                <button
                    type="button"
                    key={item}
                    className={`pagination-item ${
                        activePage === item ? 'active' : 'inactive'
                    }`}
                    onClick={() => goToPage(item)}
                >
                    {item + 1}
                </button>
            ))}
        </div>
    );
};

Pagination.defaultProps = {
    totalPages: 'some-pages',
};

export default Pagination;
