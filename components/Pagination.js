import React from 'react';
import { PaginationContainer, PaginationButton, PageInfo } from './StyledComponents';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <PaginationContainer>
      <PaginationButton 
        disabled={currentPage === 1} 
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
      >
        Previous
      </PaginationButton>
      
      <PageInfo>Page {currentPage} of {totalPages}</PageInfo>
      
      <PaginationButton 
        disabled={currentPage >= totalPages} 
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;