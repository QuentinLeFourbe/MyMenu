import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import MealsManagement from './MealManagement/MealsManagement';
import MenuManagerComponent from './MenuManager/MenuManagerComponent';
import {useSpring, animated, config} from 'react-spring'

const fadeOut = keyframes`
    from {
        opacity: 100
    }

    to {
        opacity: 0;
    }
`;

const ContentContainer = styled(animated.div)`
    border: 1px solid  lightgrey;
    border-top: 10px solid;
    border-top-color: #ff6f61;
`;

const Container =  styled(animated.div)`
    margin: 0 auto;
    width: 80vw;
`;

const TabContainer = styled.div`
    display:flex;
    width: 40vw;
    
`;

const TabButton = styled.button`
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



function Main() {
    const [state, setState] = useState(true) //true means we show menus, false we show the meals
    const props = useSpring({opacity: 1, from: {opacity: 0}})

    const springStyle = useSpring(
        {
            from: {
                y: 100,
                opacity: 0,
            },
            opacity: 1,
            y: 0,
            config: {
                tension: 100,
                friction: 20,
                mass: 1,
            },
            delay: 500,
        });

    const showMenu = () => {
        setState(true)
    }

    const showMeals = () => {
        setState(false)
    }

    const tabContent = state ? <MenuManagerComponent /> : <MealsManagement />

    return (
        <Container style={springStyle}>
            <TabContainer>
                <TabButton onClick={showMenu} active={state}>Menu</TabButton>
                <TabButton onClick={showMeals} active={!state}>Plats</TabButton>
            </TabContainer>
            <ContentContainer style={props}>
                {tabContent}
            </ContentContainer>
        </Container>
    )
}

export default Main
