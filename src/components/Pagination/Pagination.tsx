import ReactPaginate from "react-paginate";
import "./pagination.css";

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
    pageCount: number;  // Добавлено pageCount для определения общего числа страниц
  };
  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage, pageCount }) => (
    <ReactPaginate
      className="pagination"
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={pageCount}  // Используем значение из props
      forcePage={currentPage - 1}
    />
  );
  
  export default Pagination;