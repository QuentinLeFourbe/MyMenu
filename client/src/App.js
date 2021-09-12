import React, { useReducer } from 'react';
import './App.css';
import
{
  BrowserRouter as Router,
} from "react-router-dom";
import { AppContext } from './AppContext';
import { dataReducer } from './Reducers/Reducers';
import ContentFromRoute from './components/ContentFromRoute';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { } from 'dayjs/locale/fr';
import updateLocale from 'dayjs/plugin/updateLocale';
import customParseFormat from 'dayjs/plugin/customParseFormat';



const App = (props) =>
{
  dayjs.extend(customParseFormat)
  dayjs.extend(isoWeek);
  dayjs.locale('fr');
  dayjs.extend(updateLocale)
  dayjs.updateLocale('fr', {
    weekdays: [
      "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
    ]
  })

  const initialData = {
    weekDates: {
      startDate: dayjs().isoWeekday(1),
      endDate: dayjs().isoWeekday(7),
    },
    meals: [],
    ingredients: [],
    menus: [],
    user: null
  }

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
