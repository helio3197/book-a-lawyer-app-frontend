import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Detail from './components/home/Details';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/details" element={<Detail />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
