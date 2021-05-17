import React, { useState, useContext, useEffect } from 'react';
import MealCreationForm from './MealCreationForm';
import styled from 'styled-components'
import MealList from './MealList';
import FiltersComponent from '../MenuManager/FloatingMealManager/FiltersComponent';
import { AppContext } from '../../AppContext';
import { SortType } from '../../Constant';
import MealEditForm from './MealEditForm';

const Container = styled.div`
  flex-grow:1;
`;

const Wrapper = styled.div`
    border-style: solid;
    border-width: 0px 0px 1px 0px;
    border-color: #dee2e6;
    margin: 1rem;
    padding-top: 1rem;
`;

const ingredientsDispo = ["Poulet", "Riz", "Crème fraiche", "Fromage", "Maïs"];

function MealsManagement()
{
    const { dataState } = useContext(AppContext);

    // Overlay data
    const [overlayData, setOverlayState] = useState({ mealId: "", show: false });
    const showMealOverlay = (mealId) =>
    {
        setOverlayState({ mealId: mealId, show: true })
    }

    const hideMealOverlay = () =>
    {
        setOverlayState({ mealId: "", show: false })
    }

    //Filter Data
    const [filterData, setFilterData] = useState({
        meals: [],
        filter: {
            search: "",
            sort: SortType.A_Z
        }
    });

    //filter: {search: String, sort: SortType}
    const applyFilter = (filter) =>
    {
        if (filter === undefined)
        {
            console.error("Filter is undefined");
            return;
        }

        let filteredMeals =
            dataState.meals.filter(meal =>
                meal.name
                    .toLowerCase()
                    .includes(filter.search.toLowerCase())
            );

        filteredMeals.sort((meal1, meal2) => meal1.name > meal2.name);
        if (filter.sort == SortType.Z_A)
        {
            filteredMeals = filteredMeals.reverse();
        }
        setFilterData({ ...filterData, meals: filteredMeals, filter: filter });
    }

    useEffect(() =>
    {
        let meals = dataState.meals;
        meals.sort((meal1, meal2) => meal1.name > meal2.name);
        setFilterData({ ...filterData, meals: meals });
    }, [dataState.meals])

    return (
        <Container>
            <MealCreationForm />
            <Wrapper>
                <FiltersComponent applyFilter={applyFilter} filter={filterData.filter} />
            </Wrapper>
            {/* Overlay */}
            <MealEditForm mealId={overlayData.mealId} show={overlayData.show} hideFunc={hideMealOverlay} />
            <MealList meals={filterData.meals} showMealOverlay={showMealOverlay}/>
        </Container>
    )
}

export default MealsManagement
