import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Lawyer from './components/details/Details';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lawyers" element={<Home />} />
        <Route path="lawyers/:id" element={<Lawyer />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
