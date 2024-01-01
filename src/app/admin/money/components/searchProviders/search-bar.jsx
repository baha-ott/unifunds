import { useState } from "react";

import "./search-bar.css";
import { Input } from "@/components/ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SearchBar = ({ setResults, field }) => {
  const [input, setInput] = useState("");

  const supabase = createClientComponentClient();

  const fetchData = async (value) => {
    const { data, error } = await supabase.from("user").select("*");

    // const results = json.filter((user) => {
    //   return (
    //     value &&
    //     user &&
    //     user.name &&
    //     user.name.toLowerCase().includes(value)
    //   );
    console.log({data})


    const results = data.filter((user) => {
      return (
        value && user.firstname && user.firstname.toLowerCase().includes(value) && user.role === "provider"
      );
    });

    setResults(results)
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <Input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
