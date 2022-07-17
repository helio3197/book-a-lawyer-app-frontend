import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Lawyer from './components/details/Details';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Reservations from './components/Reservations/Reservations';
import Reserve from './components/reserve/Reserve';
import Account from './components/account/Account';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/lawyers/:id" element={<Lawyer />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="lawyers" element={<Home />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="sign_in" element={<SignIn />} />
        <Route path="reserve" element={<Reserve />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
