import React from 'react'
import styled from 'styled-components'
import { MENU_DINER, MENU_LUNCH } from '../../../Constant';
import Menu from './Menu';
import dayjs from 'dayjs';


const Container = styled.div`
    /* border-color: lightgrey;
    border-style: solid;
    border-width: 1px 0px 0px 0px; */
    min-height: 30vh;
    display:flex;
    flex-flow: column nowrap;
`;

const Menus = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    flex-grow:1;
`;

const Title = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    font-size: 2rem;
    background-color: #fda59c;
    color: white;
`;

function Day({ date, dayMenus, dataLoading })
{
    const lunchMenu = dayMenus ? dayMenus.find(menu => menu.type === MENU_LUNCH) : null;
    const dinerMenu = dayMenus ? dayMenus.find(menu => menu.type === MENU_DINER) : null;

    return (
        <Container>
            <Title>{dayjs(date).format('dddd D MMMM')}</Title>
            <Menus>
                <Menu title='Midi' date={date} type={MENU_LUNCH} menuData={lunchMenu} dataLoading={dataLoading} first />
                <Menu title='Soir' date={date} type={MENU_DINER} menuData={dinerMenu} dataLoading={dataLoading} />
            </Menus>
        </Container>
    )

}

export default Day
