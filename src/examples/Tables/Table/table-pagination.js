// Soft UI Dashboard React components
import SuiPagination from "components/SuiPagination";

// @mui material components
import Icon from "@mui/material/Icon";


export default function TablePagination({ page, pages, onPageChange }) {

  const handlePreviousClick = () => {
    const newPage = page == 1 ? page : page - 1;
    if( onPageChange && newPage != page ) onPageChange(newPage);
  }

  const handleNextClick = () => {
    const newPage = page == pages ? page : page + 1;
    if( onPageChange && newPage != page ) onPageChange(newPage);
  }

  const handleOnPageClick = (pageno) => {
    if( onPageChange && pageno != page ) onPageChange(pageno);
  }

  const getPages = () => {
    const pageNumbers = Array(pages).fill(1).map((_, i) => i + 1 );
    if (pages < 6) return pageNumbers;

    const showFwdBwd = 2;
    if (page < 3) return pageNumbers.slice(0, 5);
    if (page > pages - 3) return pageNumbers.slice(pages - 5)

    return pageNumbers.slice(page - showFwdBwd - 1, page + showFwdBwd);
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
              key={pageNo}
              item 
              active={page == pageNo} 
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