import React from 'react'
import styled from 'styled-components'
import Menu from './Menu';


const Container = styled.div`
    margin: 2px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    flex-grow: 1;
    flex-basis: 50px;
`;

const Menus = styled.div`
    display: flex;
    flex-flow: row nowrap;
`;

const Title = styled.h3`
    margin: 5px;
    padding: 5px;
`;

function Day(props) {

    const { title, lunchMeals, dinerMeals, dayId } = props;

    return (
        <Container>
            <Title>{title}</Title>
            <Menus>
                <Menu title='Midi' mealList={lunchMeals} menuId={`${dayId}_lunch`} first />
                <Menu title='Soir' mealList={dinerMeals} menuId={`${dayId}_diner`} />
            </Menus>
        </Container>
    )

}

export default Day
