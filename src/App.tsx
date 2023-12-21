import { FC, useEffect, useState } from 'react';
import { ItemProps, noResults, loading } from './config';
import './style.css';

const API_URL = 'https://restcountries.com/v3.1/name';


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
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (country) {
        setItems([loading]);
        const response = await fetch(`${API_URL}/${country}`);
        const json = await response.json();
        json.status !== 404 ? setItems(json) : setItems([noResults]);
      }
    }
    fetchData();
    return () => {};
  }, [country]);

  const handleChange = (e) => {
    const input = e.target.value;
    if(input === '') setItems([])
    setCountry(input);
  };
  const handleClick = (e) => {
    const input = e.target.name;
    setSelection(input);
    setItems([])
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
      {items.length !== 0 && <ul>
        {items.map((item: ItemProps) => <li key={item.index}><button name={item.name.common} type='submit' onClick={(e) => handleClick(e)}>{item.name.common}</button></li>)}
      </ul>}
    </div>
  );
};
