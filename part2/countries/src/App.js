import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Content from "./components/Content";

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [newCountries, setNewCountries] = useState([]);
  const hook = () => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setNewCountries(response.data);
    });
  };
  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div className="divposition">
      <h1 className="header">Find country info</h1>
      <input
        placeholder="Enter query country"
        value={newFilter}
        onChange={handleFilterChange}
      />
      <Content newCountries={newCountries} newFilter={newFilter} />
    </div>
  );
};

export default App;
