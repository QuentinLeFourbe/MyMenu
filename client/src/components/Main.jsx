import React, { useState } from 'react'
import styled from 'styled-components'
import MealsManagement from './MealManagement/MealsManagement';
import MenuManagerComponent from './MenuManager/MenuManagerComponent';

const ContentContainer = styled.div`
    border: 1px solid  lightgrey;
    border-top: 10px solid;
    border-top-color: #ff6f61;
`;

const Container = styled.div`
   
`;

const TabContainer = styled.div`
    display:flex;
    width: 40vw;
`;

const TabButton = styled.a`
    text-decoration: none;
    display:flex;
    border-style: solid;
    border-color: lightgrey;
    border-width: 1px 1px 0px 1px;
    padding: 1rem 1rem 1rem 1rem;
    font-size: 2rem;
    flex-grow: 1;
    &:hover{
        color: ${props => props.active ? "white" : "#ff6f61"};
    }

    & + & {
        margin: 0rem 0rem 0rem 1rem;
    }

    color: ${props => props.active ? "white" : "black"};
    background-color: ${props => props.active ? "#ff6f61" : "white"};
        
`;

const LowTabBorder = styled.div`


`;

function Main()
{
    const [state, setState] = useState(true) //true means we show menus, false we show the meals

    const showMenu = () =>
    {
        setState(true)
    }

    const showMeals = () =>
    {
        setState(false)
    }

    const tabContent = state ? <MenuManagerComponent /> : <MealsManagement />

    return (
        <Container>
            <TabContainer>
                <TabButton href="#" onClick={showMenu} active={state}>Menu</TabButton>
                <TabButton href="#" onClick={showMeals} active={!state}>Plats</TabButton>
            </TabContainer>
            <ContentContainer>
                {tabContent}
            </ContentContainer>
        </Container>
    )
}

export default Main
