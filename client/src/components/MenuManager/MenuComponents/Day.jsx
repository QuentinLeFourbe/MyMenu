import React from 'react'
import styled from 'styled-components'
import { MENU_DINER, MENU_LUNCH } from '../../../Constant';
import Menu from './Menu';
import dayjs from 'dayjs';


const Container = styled.div`
    border-color: lightgrey;
    border-style: solid;
    border-width: 1px 0px 0px 0px;
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

const Title = styled.h3`
    margin: 5px;
    padding: 5px;
`;

function Day(props)
{

    const { date, dayMenus } = props;

    const lunchMenu = dayMenus ? dayMenus.find(menu => menu.type === MENU_LUNCH) : null;
    const dinerMenu = dayMenus ? dayMenus.find(menu => menu.type === MENU_DINER) : null;

    return (
        <Container>
            <Title>{dayjs(date).format('dddd - DD/MM')}</Title>
            <Menus>
                <Menu title='Midi' date={date} type={MENU_LUNCH} menuData={lunchMenu} first />
                <Menu title='Soir' date={date} type={MENU_DINER} menuData={dinerMenu} />
            </Menus>
        </Container>
    )

}

export default Day
