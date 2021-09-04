import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from '../AppContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Authentification from './Authentification';
import Register from './Register';
import About from './About';
import { fetchMeals, getSession } from '../api';
import LoadingComponent from './Loading/LoadingComponent';
import ScrollToTop from './Utility/ScrollToTop';


function ContentFromRoute() {
    const location = useLocation();
    const { dataState, dataDispatch } = useContext(AppContext);
    const [loadingState, setLoadingState] = useState(true);
    const [showLoading, setShowLoading] = useState(true);

    const hideLoading = () => {
        setShowLoading(false);
    }

    useEffect(async () => {
        await getSession()
            .then(response => {
                console.log(`Get session: ${response.data.user}`);
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
            }).catch(error => console.log("Error: " + error))
        setLoadingState(false);
    }, []);
    // console.log(location.pathname)
    return (
        <>
            <Header user={dataState.user} show={!showLoading} />
            {
                showLoading ?
                    <LoadingComponent hideLoading={hideLoading} loadingState={loadingState} />
                    :
                    (<>
                        <ScrollToTop />
                        {console.log(dataState.user)}
                        <Switch>

                            {(dataState.user == null && location.pathname !== "/auth") ?
                                <Route path="/">
                                    <Redirect to="/auth" />
                                </Route>
                            :
                                ""
                            }

                            <Route exact path="/">
                                <Main />
                            </Route>

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
                        <Footer />
                    </>)
            }
        </>
    )
}

export default ContentFromRoute
