import React from "react";
import Country from "./Country";
import CountryToggle from "./CountryToggle";

const Content = ({ newCountries, newFilter }) => {
  const filtered = newCountries.filter((country) =>
    country.name.toUpperCase().includes(newFilter.toUpperCase())
  );

  if (newFilter === '')
  {
    return (
      <div>
      <form action="https://github.com/verajs" method="get" target="_blank">
      <button className="footerbutton">made by verajs for FullStackOpen</button>
      </form>
      </div>
    )
  }
  if (filtered.length > 10) {
    return (
      <div>
        <p className="toomany">Too many matches, specify another filter</p>
      </div>
    );
  } else if (
    (filtered.length > 2 && filtered.length < 10) ||
    filtered.length === 0
  ) {
    return (
      <div>
        {filtered.map((country) => (
          <CountryToggle key={country.name} country={country} />
        ))}
      </div>
    );
  } else {
    return <Country country={filtered[0]} capital={filtered.capital} />;
  }
};

export default Content;
