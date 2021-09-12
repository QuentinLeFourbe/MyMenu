import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from '../AppContext';
import
{
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Authentification from './Authentification';
import About from './About';
import { fetchMeals, getSession } from '../api';
import LoadingComponent from './Loading/LoadingComponent';
import ScrollToTop from './Utility/ScrollToTop';
import MealsManager from './MealManagement/MealsManager';
import MenusManager from './MenuManager/MenusManager';
import { FetchMeals } from '../Helpers/DataHelper';

function ContentFromRoute()
{
    const location = useLocation();
    const [previousLocation, setPreviousLocation] = useState();
    const { dataState, dataDispatch } = useContext(AppContext);
    const [loadingState, setLoadingState] = useState(true);
    const [showLoading, setShowLoading] = useState(true);

    const hideLoading = () =>
    {
        setShowLoading(false);
    }

    useEffect(() =>
    {

        if (previousLocation != location.pathname)
        {
            setShowLoading(true);
            setPreviousLocation(location.pathname);
        }
    })

    useEffect(async () =>
    {
        await getSession()
            .then(response =>
            {
                if (response.data.user == undefined)
                {
                    dataDispatch({ type: 'NOT_LOGGED', payload: response.data })
                    // window.location.href = "/auth"
                } else
                {
                    dataDispatch({ type: 'USER_LOGIN', payload: response.data })
                    FetchMeals(dataDispatch);
                }
            }).catch(error => console.log("Error: " + error))
        setLoadingState(false);
    }, []);
    // console.log(location.pathname)



    return (
        <>
            <Header user={dataState.user} show={true} />
            {
                showLoading ?
                    <LoadingComponent hideLoading={hideLoading} loadingState={loadingState} />
                    :
                    (<>
                        <ScrollToTop />
                        <Switch>

                            {(dataState.user == null) ?
                                <Route path="/">
                                    <Authentification />
                                </Route>
                                :
                                ""
                            }

                            <Route exact path="/">
                                <MenusManager />
                            </Route>

                            <Route exact path="/meals">
                                <MealsManager />
                            </Route>

                            <Route exact path="/about">
                                <About />
                            </Route>
                        </Switch>
                        {/* <Footer /> */}
                    </>)
            }
        </>
    )
}

export default ContentFromRoute
