import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';

const App = () => (
  <>
    <div className="App" />
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </>
);

export default App;
