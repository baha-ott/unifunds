import "./search-resultsList.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import SearchResult from "./search-result";

const SearchResultsList = ({ results, field }) => {
  return (
    <div className="results-list">
      {/* {results.map((result, id) => {
        return <SearchResult result={result.firstname} key={id} />;
      })} */}

      <Select {...field} onValueChange={field.onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Providers list" />
        </SelectTrigger>
        <SelectContent>
          {results.length === 0 && "No providers found"}
          {results.map((result, id) => {
            return (
              <SelectItem value={result.user_id} key={id}>
                {result.firstname}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchResultsList;
