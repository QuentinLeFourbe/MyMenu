import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from '../AppContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Authentification from './Authentification';
import Register from './Register';
import About from './About';
import { fetchMeals, getSession } from '../api';
import LoadingComponent from './LoadingComponent';


function ContentFromRoute() {
    const { dataState, dataDispatch } = useContext(AppContext);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(async () => {
        setLoadingState(true);
        await getSession()
            .then(response => {
                if (response.data.user == undefined) {
                    dataDispatch({ type: 'NOT_LOGGED', payload: response.data })
                    // window.location.href = "/auth"
                } else {
                    dataDispatch({ type: 'USER_LOGIN', payload: response.data })
                    fetchMeals()
                        .then(response => {
                            dataDispatch({ type: 'FETCH_MEALS', payload: response.data })
                        })
                        .catch(error => {
                            console.error("Error: " + error.message)
                        })
                }
                setLoadingState(false);
            })
    }, []);

    return (
        loadingState ? <LoadingComponent/> : 
        <Router>
            <Switch>
                <Route exact path="/">
                    <Header />
                    {dataState.user != null ? <Main /> : <Redirect to="/auth" />}
                    <Footer />
                </Route>


                {/* <Route exact path="/">
            <Header />
            <MainArea>
              <Main />
            </MainArea>
            <Footer />
          </Route> */}

                <Route exact path="/auth">
                    {dataState.user == null ? <Authentification /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/register">
                    <Register />
                </Route>

                <Route exact path="/about">
                    <About />
                </Route>
            </Switch>
        </Router>
    )
}

export default ContentFromRoute
