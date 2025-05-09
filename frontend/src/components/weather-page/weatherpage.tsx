import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
}

const WeatherPage: React.FC = () => {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<WeatherData | null>(null);

  useEffect(() => {
    axios.get<WeatherData[]>('http://localhost:5000/weather/random')
      .then(res => setWeatherList(res.data))
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    axios.get<WeatherData>(`http://localhost:5000/weather/search?city=${search}`)
      .then(res => setSearchResult(res.data))
      .catch(() => setSearchResult(null));
  };

  return (
    <div className="font-poppins min-h-screen bg-blue-100 p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Weather Dashboard</h1>

        <div className="mb-6 flex gap-2">
          <input
            type="text"
            className="w-full p-2 rounded border"
            placeholder="Search city"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

        {searchResult && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-xl font-bold">{searchResult.city}</h2>
            <p>{searchResult.temperature}°C - {searchResult.description}</p>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-4">5 Random Cities</h2>
        <div className="grid gap-4">
          {weatherList.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{item.city}</h3>
              <p>{item.temperature}°C - {item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
