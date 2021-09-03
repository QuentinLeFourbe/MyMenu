import React, { useEffect, useReducer } from 'react';
import './App.css';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { fetchMeals, getSession } from './api';
import { AppContext } from './AppContext';
import { dataReducer } from './Reducers/Reducers';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
import Authentification from './components/Authentification';
import Register from './components/Register';
import About from './components/About';
import ContentFromRoute from './components/ContentFromRoute';


const MainArea = styled.main`
  grid-area: main;
  padding: 5vh 5vw 5vh 5vw;
`;

const initialData = {
  meals: [],
  ingredients: [],
  menus: [],
  user: null
}

const App = (props) => {

  const [data, dispatch] = useReducer(dataReducer, initialData)

  return (
    <AppContext.Provider value={{ dataState: data, dataDispatch: dispatch }}>
      <Router>
        <ContentFromRoute />
      </Router>
    </AppContext.Provider>
  )
}

export default App;
