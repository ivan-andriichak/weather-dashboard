// import './App.css';
import {WeatherData} from "./types";
import {useState} from "react";
import {getWeatherData} from "./services/weatherAPI.ts";
import {SearchBar} from "./components/SearchBar.tsx";
import {WeatherCard} from "./components/WeatherCard.tsx";
import {LoadingSkeleton} from "./components/LoadingSkeleton.tsx";

function App() {
const [weather, setWeather] = useState<WeatherData | null>(null);
const [error, setError] = useState<string | null>('');
const [isLoading, setIsLoading] = useState(false);

const handleSearch = async (city: string) => {
try {
  setIsLoading(true);
  setError('');
  const data = await getWeatherData(city);
  setWeather(data);
} catch (error) {
  setError(error instanceof Error ? error.message : 'An unexpected error occurred');
  setWeather(null);
}finally {
  setIsLoading(false);
}
}


  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col justify-between"  >
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Weather Dashboard
          </h1>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {isLoading && <LoadingSkeleton />}
          {!isLoading && weather && <WeatherCard data={weather} />}
          {!isLoading && error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
       </div>
       <footer className="mt-8 text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Weather Dashboard. All rights reserved.
        </p>
       </footer>
      </div>
    </>
  )
}

export default App
