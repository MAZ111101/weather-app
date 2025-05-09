import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import WeatherPage from './components/weather-page/weatherpage';

function App() {
  return (
    <Router>
      <div className= 'min-h-screen bg-gray-50 text-gray-800'>
        <Routes>
          <Route path= "/" element = {<WeatherPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
