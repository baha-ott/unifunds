 
"use client"
import { useState } from "react";

import  SearchBar  from "./search-bar";
import  SearchResultsList  from "./search-resultsList";

function InputSearch({field}) {
  const [results, setResults] = useState([]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar setResults={setResults}  />
       <SearchResultsList results={results} field={field}/>
      </div>
    </div>
  );
}

export default InputSearch;