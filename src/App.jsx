import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Update from './views/Update';
import { useState } from 'react';

const initialCurrencies = [
  { type: '₪ Israeli Shekel', value: 1 },
  { type: '$ USD', value: 4 },
  { type: '€ Euro', value: 5 }
]

function App() {
  const [currenciesArr, setCurrenciesArr] = useState(initialCurrencies);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home currenciesArr={currenciesArr} />} />
          <Route path='/update' element={<Update currenciesArr={currenciesArr}
            setCurrenciesArr={setCurrenciesArr} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
