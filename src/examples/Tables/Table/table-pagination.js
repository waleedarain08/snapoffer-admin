// Soft UI Dashboard React components
import SuiPagination from "components/SuiPagination";

// @mui material components
import Icon from "@mui/material/Icon";
import { useState } from "react";


export default function TablePagination({ pages, onPageChange }) {

  const [current, setCurrent] = useState(1);

  const handlePreviousClick = () => {
    setCurrent((current) => {
      const page = current == 1 ? current : current - 1;
      if( onPageChange && page != current ) onPageChange(page);
      return page;
    });
  }

  const handleNextClick = () => {
    setCurrent((current) => {
      const page = current == pages ? current : current + 1;
      if( onPageChange && page != current ) onPageChange(page);
      return page;
    });
  }

  const handleOnPageClick = (pageno) => {
    if( onPageChange && pageno != current ) onPageChange(pageno);
    setCurrent(pageno);
  }

  const getPages = () => {
    const pageNumbers = Array(pages).fill(1).map((_, i) => i + 1 );
    if (pages < 6) return pageNumbers;

    const showFwdBwd = 2;
    if (current < 3) return pageNumbers.slice(0, 5);
    if (current > pages - 3) return pageNumbers.slice(pages - 5)

    return pageNumbers.slice(current - showFwdBwd - 1, current + showFwdBwd);
  }

  return (
    <SuiPagination>
      <SuiPagination item onClick={handlePreviousClick}>
        <Icon>keyboard_arrow_left</Icon>
      </SuiPagination>

      {
        getPages()
          .map((pageNo) => (
            <SuiPagination 
              item 
              active={current == pageNo} 
              onClick={() => handleOnPageClick(pageNo)}>
                {pageNo}
            </SuiPagination>)
          )
      }

      <SuiPagination item onClick={handleNextClick}>
        <Icon>keyboard_arrow_right</Icon>
      </SuiPagination>

    </SuiPagination>    
  );
}