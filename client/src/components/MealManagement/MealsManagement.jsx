import React from 'react';
import MealCreationForm from './MealCreationForm';
import styled from 'styled-components'
import MealList from './MealList';
import FiltersComponent from '../MenuManager/FloatingMealManager/FiltersComponent';


const Container = styled.div`
  
`;



const ingredientsDispo = ["Poulet", "Riz", "Crème fraiche", "Fromage", "Maïs"];

function MealsManagement() {
    
    return (
        <Container>
            <MealCreationForm />
            <MealList />
        </Container>
    )
}

export default MealsManagement
