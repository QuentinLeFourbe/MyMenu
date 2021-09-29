import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import WeeksNavBar from './WeeksNavBar/WeeksNavBar'
import DaysContainer from './MenuComponents/DaysContainer';
import { AppContext } from '../../AppContext';
import { FetchMenus } from '../../Helpers/DataHelper';

const Container = styled.div`
  flex-grow:1;
`;

function MenusManager()
{
    //UseContext
    const { dataState, dataDispatch } = useContext(AppContext);
    const weekDates = dataState.weekDates;
    const [isDataLoading, setIsDataLoading] = useState(false);

    //Called when the week has been changed, at the start or in the weeknavbar
    const weekChanged = async (startDate, endDate) =>
    {
        setIsDataLoading(true);
        // await new Promise(r => setTimeout(r, 500));
        await FetchMenus(dataDispatch, startDate, endDate)
            .then(async () => 
            {
                dataDispatch({ type: 'weekDates/update', payload: { startDate: startDate, endDate: endDate } })
                setIsDataLoading(false)
            });
    }

    return (
        <Container>
            <WeeksNavBar
                weekChanged={weekChanged}
                startDate={weekDates.startDate}
                endDate={weekDates.endDate}
            />
            <DaysContainer
                menus={dataState.menus}
                startDate={weekDates.startDate}
                endDate={weekDates.endDate}
                dataLoading={isDataLoading}
            />
        </Container>
    )
}

export default MenusManager
