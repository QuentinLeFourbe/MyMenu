import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../AppContext';
import FiltersComponent from '../MenuManager/FloatingMealManager/FiltersComponent';
import MealEditForm from './MealEditForm';

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

const MealContainer = styled.a`
    display:flex;
    min-height: 300px;
    border-radius: 1rem;
    background-size: cover;
    background-image: url('http://localhost:5000/${props => props.image}');
    background-position: center; 
`;

const Item = styled.div`
   
&::before{
        content: "";
        height: 100%;
        width: 100%;
        border-radius: 0rem 0rem 1rem 1rem;
        background-color: #838383;
        position: absolute;
        top: 0;
        left: 0;
        opacity:0.5;
        z-index: -1;
    }

    color: white;
    flex-grow:1;
    align-self: flex-end;
    position: relative;
    padding:0.5rem;
    z-index: 1;

`;

function MealList() {
    const context = useContext(AppContext);
    const { dataState } = context;

    const [overlayData, setOverlayState] = useState({ mealId: "", show: false });
    const ShowMealOverlay = (mealId) => {
        setOverlayState({ mealId: mealId, show: true })
    }

    const HideMealOverlay = () => {
        setOverlayState({ mealId: "", show: false })
    }

    return (
        <>
            <MealEditForm mealId={overlayData.mealId} show={overlayData.show} hideFunc={HideMealOverlay} />
            <Wrapper>
                <FiltersComponent />
            </Wrapper>
            <Container>
                {
                    dataState.meals.map(meal => (
                        <MealContainer
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                ShowMealOverlay(meal.id);
                            }}
                            key={meal.id}
                            image={meal.mealImage}>
                            <Item>{meal.name}</Item>
                        </MealContainer>
                    ))
                }
            </Container>
        </>
    )
}

export default MealList
