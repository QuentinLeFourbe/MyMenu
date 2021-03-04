import React, { useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../AppContext';
import Poulet from '../../images/Poulet_caramel.jpg'
import FiltersComponent from '../MenuManager/FloatingMealManager/FiltersComponent';
import MealItem from './MealItem';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    /* This is better for small screens, once min() is better supported */
    /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
    grid-gap: 1rem;
    /* This is the standardized property now, but has slightly less support */
    margin: 1rem;
`;

const Wrapper = styled.div`
    border-style: solid;
    border-width: 1px;
    border-color: #dee2e6;
    border-radius: 1rem;
    margin: 1rem;
    padding-top: 1rem;
`;



function MealList() {
    const context = useContext(AppContext);
    const { dataState } = context;

    return (
        <>
            <Wrapper>
                <FiltersComponent />
            </Wrapper>
            <Container>
                {
                    dataState.meals.map(meal => <MealItem key={meal.id} image={meal.selectedFile}>{meal.name}</MealItem>)
                }
            </Container>
        </>
    )
}

export default MealList
