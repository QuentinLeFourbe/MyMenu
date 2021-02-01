import React from 'react';

import './App.css';
import MenuManagerComponent from './components/MenuManagerComponent';
import MealsManagement from './components/MealsManagement';
import Authentification from './components/Authentification';
import Register from './components/Register';
import About from './components/About';
import Header from './components/Header';

import styled from 'styled-components';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";


const MainPage = styled.div`
`;

const App = () => (
  <Router>
    <MainPage>

      <Header />

      <Switch>
        <Route exact path="/">
          <MenuManagerComponent />
        </Route>

        <Route exact path="/meals">
          <MealsManagement />
        </Route>

        <Route exact path="/auth">
          <Authentification />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>
      </Switch>

    </MainPage>

  </Router>
);


export default App;
