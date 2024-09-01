import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountDown,
  faSortAmountUp,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const Sort: React.FC<SearchProps> = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="sort-icons">
      <FontAwesomeIcon
        icon={faSortAmountDown}
        className={`sort-icon ${sortOrder === "asc" ? "active" : ""}`}
        onClick={() => setSortOrder("asc")}
        title="Sort by Price: Low to High"
      />
      <FontAwesomeIcon
        icon={faSortAmountUp}
        className={`sort-icon ${sortOrder === "desc" ? "active" : ""}`}
        onClick={() => setSortOrder("desc")}
        title="Sort by Price: High to Low"
      />
      <FontAwesomeIcon
        icon={faUndo}
        className={`sort-icon ${sortOrder === "" ? "active" : ""}`}
        onClick={() => setSortOrder("")}
        title="Reset Sorting"
      />
    </div>
  );
};

export default Sort;