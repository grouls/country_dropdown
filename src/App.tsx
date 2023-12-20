import { FC, useEffect, useState } from 'react';

import './style.css';

const API_URL = 'https://restcountries.com/v3.1/name';

export const App: FC = () => {
  const [country, setCountry] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (country) {
        const response = await fetch(`${API_URL}/${country}`);
        const json = await response.json();
        setData(json);
      }
    }
    fetchData();

    return () => {};
  }, [country]);

  const handleChange = (e) => setCountry(e.target.value);

  return (
    <div className="container">
      <input
        type="input"
        placeholder="Enter a country"
        value={country}
        onChange={(e) => handleChange(e)}
      />
      {/* <ul>
        <li>
          <button type="submit">Option 1</button>
        </li>
        <li>
          <button type="submit">Option 2</button>
        </li>
      </ul> */}
    </div>
  );
};
