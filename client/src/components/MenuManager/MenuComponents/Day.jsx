import React from 'react'
import styled from 'styled-components'
import { MENU_DINER, MENU_LUNCH } from '../../../Constant';
import Menu from './Menu';
import dayjs from 'dayjs';


const Container = styled.div`
    /* border-color: lightgrey;
    border-style: solid;
    border-width: 1px 0px 0px 0px; */
    /* min-height: 30vh; */
    display:flex;
    flex-flow: column wrap;
    margin: 4px;
    flex-grow: 1;
    /* grid-column-start: ${props => props.dayIndex};  */
`;

const Menus = styled.div`
    display: flex;
    flex-flow: column nowrap;
    /* flex-flow: row nowrap; */

    @media (max-width: 600px){
        flex-flow: column nowrap;
    }
    /* align-items: stretch; */
    border: 1px solid lightgrey;
    border-top: 0px;
    align-content: stretch;
    align-items: stretch;
    border-radius: 0px 0px 8px 8px;

`;

const Title = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    font-size: 1rem;
    background-color: #fda59c;
    color: white;
    border-radius: 8px 8px 0px 0px;
`;

function Day({ date, dayMenus, dataLoading, dayIndex, })
{
    const lunchMenu = dayMenus ? dayMenus.find(menu => menu.type === MENU_LUNCH) : null;
    const dinerMenu = dayMenus ? dayMenus.find(menu => menu.type === MENU_DINER) : null;
    // console.log("dayMenus");
    // console.log(dayMenus);
    return (
        <Container dayIndex={dayIndex}>
            <Title>{dayjs(date).format('dddd D MMMM')}</Title>
            <Menus>
                <Menu
                    first
                    title='Midi'
                    date={date}
                    type={MENU_LUNCH}
                    menuData={lunchMenu}
                    dataLoading={dataLoading}
                />
                <Menu
                    title='Soir'
                    date={date}
                    type={MENU_DINER}
                    menuData={dinerMenu}
                    dataLoading={dataLoading}
                />
            </Menus>
        </Container>
    )

}

export default Day
