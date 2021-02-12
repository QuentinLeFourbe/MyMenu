import React from 'react';

import './App.css';
import MenuManagerComponent from './components/MenuManagerComponent';
import MealsManagement from './components/MealManagement/MealsManagement';
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
  display:grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
  "header header header"
  "main main main"
  "footer footer footer";
`;

const GridArea = styled.div`
  grid-area: ${props => props.name};
`;

const App = () => (
  <Router>
    <MainPage>

    <GridArea name="header"><Header/></GridArea>

      <GridArea name="main">
        <MenuManagerComponent />
      </GridArea>

      {/* <Header /> */}

      {/* <Switch>
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
      </Switch> */}



    </MainPage>

  </Router>
);


export default App;
