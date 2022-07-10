import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
