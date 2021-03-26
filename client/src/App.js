import React, { useEffect, useReducer } from 'react';

import './App.css';
import MenuManagerComponent from './components/MenuManager/MenuManagerComponent';
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
import { AppContext } from './AppContext';
import { dataReducer } from './Reducers/Reducers';
import axios from 'axios';

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

const initialData = {
  meals: [],
  ingredients: [],
  menus:[],
}

const App = (props) => {

  const [data, dispatch] = useReducer(dataReducer, initialData)

  useEffect(async () => {
    axios.get("http://localhost:5000/meals/lookup")
      .then(response => {
        dispatch({ type: 'FETCH_MEALS', payload: response.data })
      })
      .catch(error => {
        console.error("Error: " + error.message)
      })
  }, []);

  return (
    <AppContext.Provider value={{ dataState: data, dataDispatch: dispatch }}>
      <Router>
        <MainPage>

          <GridArea name="header">
            <Header />
          </GridArea>

          <GridArea name="main">

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

          </GridArea>
        </MainPage>
      </Router>

    </AppContext.Provider>
  )
}

export default App;
