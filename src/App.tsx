import { FC, useEffect, useState } from 'react';

import './style.css';

const API_URL = 'https://restcountries.com/v3.1/name';

const noResults = {
  name: {
    common: 'No Results found.'
  }
}
const loading = {
  name: {
    common: 'Loading...'
  }
}
/*
  - Add validation, string only
  - Clear list whenever the user clears the input
  - useReducer instead of useState
  - make a better loading/error/empty state
  - improve API status handling
  - Split file into Component and API folder
  - improve styles
 */
export const App: FC = () => {
  const [country, setCountry] = useState('');
  const [selection, setSelection] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (country) {
        setData([loading]);
        const response = await fetch(`${API_URL}/${country}`);
        const json = await response.json();
        json.status !== 404 ? setData(json) : setData([noResults]);
      }
    }
    fetchData();
    return () => {};
  }, [country]);

  const handleChange = (e) => {
    const input = e.target.value;
    if(input === '') setData([])
    setCountry(input);
  };
  const handleClick = (e) => {
    const input = e.target.name;
    setSelection(input);
    setData([])
    setCountry('')
  };
  return (
    <div className="container">
      <h1>{selection}</h1>
      <input
        type="input"
        placeholder="Enter a country"
        value={country}
        onChange={(e) => handleChange(e)}
      />
      {data.length !== 0 && <ul>
        {data.map(d => <li><button name={d.name.common} type='submit' onClick={(e) => handleClick(e)}>{d.name.common}</button></li>)}
      </ul>}
    </div>
  );
};
