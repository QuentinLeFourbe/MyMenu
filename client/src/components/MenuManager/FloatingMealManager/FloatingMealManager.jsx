import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AppContext } from '../../../AppContext';
import { SortType } from '../../../Constant';
import FiltersComponent from './FiltersComponent';
import FloatingMealList from './FloatingMealList';

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    position: sticky; 
    top: 5vh;
    width: 15vw;
    height: 70vh;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: white;

    border: 1px solid lightgrey;
    border-left:0px;
`;

const Title = styled.div`
    margin: 10px;
    text-align: center;
    vertical-align: middle;
    font-size: 23px;
`;



const SeparationLine = styled.div`
    border-top: 1px solid lightgrey;
    margin: 0px 8px 8px 8px ;
`;



function FloatingMealManager()
{
    const { dataState } = useContext(AppContext);
    const [data, setData] = useState({
        meals: [],
        filter: {
            search: "",
            sort: SortType.A_Z
        }
    });


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
        setData({ ...data, meals: filteredMeals, filter: filter });
    }

    useEffect(() =>
    {
        let meals = dataState.meals;
        meals.sort((meal1, meal2) => meal1.name > meal2.name);
        setData({ ...data, meals: meals });
    }, [dataState.meals])

    return (
        <Container>
            <Title>Mes recettes !</Title>
            <FiltersComponent applyFilter={applyFilter} filter={data.filter} />
            <SeparationLine />
            <FloatingMealList meals={data.meals} />
        </Container>
    )
}

export default FloatingMealManager
